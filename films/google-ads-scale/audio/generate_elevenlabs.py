import urllib.request
import json
import time
import subprocess
import os

API_KEY = 'sk_19fz6oqint7eor7m43pmx51ft7nakprb7pksehzc85c2y4zx'
VOICE_ID = 'elevenlabs_0Aun6zCvE1rNqDXMwV64'

SCENES = [
    {
        'id': 'scene1',
        'display_text': 'Agar aapka business scale nahi ho raha, toh reason simple hai: Social media par log sirf timepass scroll karte hain, unka khareedne ka koi intent nahi hota!',
        'tts_text': 'अगर आपका बिज़नेस स्केल नहीं हो रहा, तो रीज़न बिल्कुल सिंपल है: सोशल मीडिया पर लोग सिर्फ टाइमपास स्क्रॉल करते हैं, उनका खरीदने का कोई इरादा नहीं होता!'
    },
    {
        'id': 'scene2',
        'display_text': 'Yahan game badalta hai Google Ads! Google par roz 850 crore searches hoti hain, jahan log wallet haath me lekar direct solution dhoondhte hain.',
        'tts_text': 'यहाँ गेम बदलता है गूगल ऐड्स! गूगल पर रोज़ आठ सौ पचास करोड़ सर्चेस होती हैं, जहाँ लोग वॉलेट हाथ में लेकर डायरेक्ट सॉल्यूशन और प्रोडक्ट्स ढूंढते हैं।'
    },
    {
        'id': 'scene3',
        'display_text': 'Google Ads ka 3-way ecosystem dekho: Search Ads se high intent buyer, YouTube Ads se brand trust, aur Performance Max se 90% internet reach!',
        'tts_text': 'गूगल ऐड्स का थ्री-वे इकोसिस्टम देखो: सर्च ऐड्स से हाई-इन्टेंट खरीदार, यूट्यूब ऐड्स से ब्रांड ट्रस्ट, और परफॉरमेंस मैक्स से नब्बे परसेंट इंटरनेट पर आपका ऐड चलता है!'
    },
    {
        'id': 'scene4',
        'display_text': 'Sabse bada benefit: Pay-Per-Click! Jab tak serious customer click na kare, zero cost. Aur Smart Bidding AI automatic lowest cost par maximum sales laata hai.',
        'tts_text': 'सबसे बड़ा फायदा: पे-पर-क्लिक! जब तक कोई सीरियस कस्टमर क्लिक ना करे, ज़ीरो कॉस्ट। और स्मार्ट बिडिंग AI सबसे कम खर्च में आपको मैक्सिमम सेल्स देता है।'
    },
    {
        'id': 'scene5',
        'display_text': 'Aapke competitors already aapke customers capture kar rahe hain. Aaj hi Google Ads start karo! Comment karo GOOGLE for free scaling roadmap!',
        'tts_text': 'आपके कॉम्पिटिटर्स पहले ही आपके कस्टमर्स छीन रहे हैं। इंतज़ार मत करो, आज ही गूगल ऐड्स शुरू करो! कमेंट करो GOOGLE फ्री स्केलिंग ब्लूप्रिंट के लिए।'
    }
]

def generate_tts(text, output_file):
    url = 'https://api.ai33.pro/v3/text-to-speech'
    payload = {
        'voice_id': VOICE_ID,
        'text': text,
        'model_id': 'eleven_multilingual_v2',
        'language': 'hi'
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode('utf-8'),
        headers={
            'xi-api-key': API_KEY,
            'Content-Type': 'application/json'
        }
    )
    with urllib.request.urlopen(req) as resp:
        res = json.loads(resp.read().decode('utf-8'))
        task_id = res['task_id']
        print(f'Submitted task {task_id} for text: {text[:35]}...')

    # Poll task
    for _ in range(40):
        time.sleep(2)
        poll_req = urllib.request.Request(
            f'https://api.ai33.pro/v1/task/{task_id}',
            headers={'xi-api-key': API_KEY}
        )
        with urllib.request.urlopen(poll_req) as p_resp:
            task_res = json.loads(p_resp.read().decode('utf-8'))
            if task_res.get('status') == 'done':
                audio_url = task_res['metadata']['audio_url']
                print(f'Done! Downloading from {audio_url}')
                subprocess.run(['curl.exe', '-s', '-L', '-H', 'User-Agent: Mozilla/5.0', audio_url, '-o', output_file], check=True)
                return True
            elif task_res.get('status') == 'failed':
                print(f'Failed task {task_id}:', task_res)
                return False
    return False

def get_duration(file_path):
    cmd = ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file_path]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, text=True, check=True)
    return float(res.stdout.strip())

def main():
    os.makedirs('films/google-ads-scale/audio/segments_eleven', exist_ok=True)
    cues = []
    current_time = 0.0
    file_list = []

    for i, sc in enumerate(SCENES):
        seg_file = f'films/google-ads-scale/audio/segments_eleven/{sc["id"]}.mp3'
        print(f'Generating segment {i+1}/{len(SCENES)}: {sc["id"]}...')
        ok = generate_tts(sc['tts_text'], seg_file)
        if not ok:
            raise RuntimeError(f'Failed to generate {sc["id"]}')
        
        dur = get_duration(seg_file)
        cues.append({
            'id': sc['id'],
            'display_text': sc['display_text'],
            'start': round(current_time, 2),
            'end': round(current_time + dur, 2),
            'duration': round(dur, 2)
        })
        current_time += dur + 0.30
        file_list.append(seg_file)

    # Concat all segments into voiceover.mp3
    concat_txt = 'films/google-ads-scale/audio/segments_eleven/concat.txt'
    with open(concat_txt, 'w', encoding='utf-8') as f:
        for fl in file_list:
            abs_p = os.path.abspath(fl).replace('\\', '/')
            f.write(f"file '{abs_p}'\n")

    final_audio = 'films/google-ads-scale/audio/voiceover.mp3'
    concat_cmd = ['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', concat_txt, '-c', 'copy', final_audio]
    subprocess.run(concat_cmd, check=True)

    total_dur = get_duration(final_audio)
    print(f'Total ElevenLabs audio generated: {total_dur:.2f}s')

    with open('films/google-ads-scale/audio/cues.json', 'w', encoding='utf-8') as f:
        json.dump(cues, f, indent=2, ensure_ascii=False)
    print('Saved cues.json with scene timestamps:')
    for c in cues:
        print(f"  {c['start']}s -> {c['end']}s: {c['display_text']}")

if __name__ == '__main__':
    main()
