import asyncio
import json
import edge_tts

VOICE = 'hi-IN-MadhurNeural'
SCRIPT = [
    {
        'id': 'scene1',
        'text': 'Agar aapka business scale nahi ho raha, toh reason simple hai: Social media par log sirf timepass scroll karte hain, unka khareedne ka koi intent nahi hota!'
    },
    {
        'id': 'scene2',
        'text': 'Yahan game badalta hai Google Ads! Google par roz 850 crore searches hoti hain, jahan log wallet haath me lekar direct solution dhoondhte hain.'
    },
    {
        'id': 'scene3',
        'text': 'Google Ads ka 3-way ecosystem dekho: Search Ads se high intent buyer, YouTube Ads se brand trust, aur Performance Max se 90% internet par aapka ad chalta hai!'
    },
    {
        'id': 'scene4',
        'text': 'Sabse bada benefit: Pay-Per-Click! Jab tak koi serious customer click na kare, zero cost. Aur Smart Bidding AI automatic lowest cost par maximum sales laata hai.'
    },
    {
        'id': 'scene5',
        'text': 'Aapke competitors already aapke customers ko capture kar rahe hain. Aaj hi Google Ads start karo! Comment karo GOOGLE for free scaling roadmap!'
    }
]

async def gen():
    full_text = ' '.join(s['text'] for s in SCRIPT)
    comm = edge_tts.Communicate(full_text, VOICE, rate='+14%')
    cues = []
    audio_path = 'films/google-ads-scale/audio/voiceover.mp3'
    cues_path = 'films/google-ads-scale/audio/cues.json'
    
    with open(audio_path, 'wb') as f:
        async for chunk in comm.stream():
            if chunk['type'] == 'audio':
                f.write(chunk['data'])
            elif chunk['type'] == 'SentenceBoundary':
                start = chunk['offset'] / 10_000_000
                dur = chunk['duration'] / 10_000_000
                cues.append({
                    'text': chunk['text'],
                    'start': round(start, 2),
                    'end': round(start + dur, 2)
                })
                
    # Now generate segment timings for scenes
    cur = 0.0
    scene_cues = []
    for s in SCRIPT:
        s_comm = edge_tts.Communicate(s['text'], VOICE, rate='+14%')
        s_path = f'films/google-ads-scale/audio/segments/{s["id"]}.mp3'
        with open(s_path, 'wb') as f:
            async for chunk in s_comm.stream():
                if chunk['type'] == 'audio':
                    f.write(chunk['data'])
                elif chunk['type'] == 'SentenceBoundary':
                    pass

    # Inspect length with ffprobe
    print("Voice generation complete.")

if __name__ == '__main__':
    asyncio.run(gen())
