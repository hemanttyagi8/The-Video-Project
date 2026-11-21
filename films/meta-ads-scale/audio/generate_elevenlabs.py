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
        'display_text': 'Agar aapka business scale nahi ho raha, toh problem product me nahi, aapki reach me hai!',
        'tts_text': 'अगर आपका बिज़नेस स्केल नहीं हो रहा, तो प्रॉब्लम प्रोडक्ट में नहीं, आपकी रीच में है!'
    },
    {
        'id': 'scene2',
        'display_text': 'Instagram par roz posts daalne se scale nahi hota. Meta Ads ka AI laser-sharp targeting se ideal buyers ko dhoondhta hai.',
        'tts_text': 'इंस्टाग्राम पर रोज़ पोस्ट्स डालने से स्केल नहीं होता। मेटा ऐड्स का AI लेज़र शार्प टारगेटिंग से आपके असली खरीदारों को ढूंढ निकालता है।'
    },
    {
        'id': 'scene3',
        'display_text': 'Yeh kaam karta hai ek proven 3-stage funnel par: Top Awareness, Middle Consideration, aur Bottom Purchase!',
        'tts_text': 'यह काम करता है एक प्रूवन थ्री-स्टेज फ़नल पर: टॉप पर अवेयरनेस, मिडल पर कन्सिडरेशन, और बॉटम पर डायरेक्ट परचेस!'
    },
    {
        'id': 'scene4',
        'display_text': 'Aur 97% log jo cart chhod gaye? Meta Pixel unhe retarget karke deta hai 4X se 5X ROAS!',
        'tts_text': 'और ninety-seven percent लोग जो कार्ट छोड़ कर चले गए? मेटा पिक्सेल उन्हें रीटारगेट करके देता है four-X से five-X ROAS!'
    },
    {
        'id': 'scene5',
        'display_text': 'Stop guessing, start scaling! Follow @megacrowdlab aur launch karo apna high-ROI Meta ad campaign!',
        'tts_text': 'स्टॉप गेसिंग, स्टार्ट स्केलिंग! फॉलो करें @megacrowdlab और आज ही लॉन्च करें अपना हाई-ROI मेटा ऐड कैंपेन!'
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
        print(f'Submitted task {task_id} for text: {text[:30]}...')

    # Poll task
    for _ in range(30):
        time.sleep(2)
        poll_req = urllib.request.Request(
            f'https://api.ai33.pro/v1/task/{task_id}',
            headers={'xi-api-key': API_KEY}
        )
        with urllib.request.urlopen(poll_req) as p_resp:
            task_res = json.loads(p_resp.read().decode('utf-8'))
            if task_res['status'] == 'done':
                audio_url = task_res['metadata']['audio_url']
                print(f'Done! Downloading from {audio_url}')
                # Download using curl to avoid any forbidden header issues
                subprocess.run(['curl.exe', '-s', '-L', '-H', 'User-Agent: Mozilla/5.0', audio_url, '-o', output_file], check=True)
                return True
            elif task_res['status'] == 'failed':
                print(f'Failed task {task_id}:', task_res)
                return False
    return False

def get_duration(file_path):
    cmd = ['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file_path]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, text=True, check=True)
    return float(res.stdout.strip())

def main():
    os.makedirs('films/meta-ads-scale/audio/segments', exist_ok=True)
    cues = []
    current_time = 0.0
    file_list = []

    for i, sc in enumerate(SCENES):
        seg_file = f'films/meta-ads-scale/audio/segments/{sc["id"]}.mp3'
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
        current_time += dur + 0.35 # small pause between scenes
        file_list.append(seg_file)

    # Concat all segments into voiceover_elevenlabs.mp3
    concat_txt = 'films/meta-ads-scale/audio/segments/concat.txt'
    with open(concat_txt, 'w', encoding='utf-8') as f:
        for fl in file_list:
            # write silence or file
            abs_p = os.path.abspath(fl).replace('\\', '/')
            f.write(f"file '{abs_p}'\n")

    final_audio = 'films/meta-ads-scale/audio/voiceover_elevenlabs.mp3'
    # Use ffmpeg concat filter with small pause or directly
    concat_cmd = ['ffmpeg', '-y', '-f', 'concat', '-safe', '0', '-i', concat_txt, '-c', 'copy', final_audio]
    subprocess.run(concat_cmd, check=True)

    total_dur = get_duration(final_audio)
    print(f'Total audio generated: {total_dur:.2f}s')

    # Save cues
    with open('films/meta-ads-scale/audio/cues.json', 'w', encoding='utf-8') as f:
        json.dump(cues, f, indent=2, ensure_ascii=False)
    print('Saved cues.json with scene timestamps:')
    for c in cues:
        print(f"  {c['start']}s -> {c['end']}s: {c['display_text']}")

if __name__ == '__main__':
    main()
