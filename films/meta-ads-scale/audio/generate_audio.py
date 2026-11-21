import asyncio
import json
import edge_tts

VOICE = 'hi-IN-MadhurNeural'
SCRIPT = [
    {
        'id': 'hook',
        'text': 'Agar aapka business scale nahi ho raha, toh problem product me nahi, aapke reach aur conversion funnel me hai!'
    },
    {
        'id': 'problem',
        'text': 'Traditional organic reach ab sirf do percent reh gayi hai, jisse business scale hona impossible hai.'
    },
    {
        'id': 'solution',
        'text': 'Yahan kaam aata hai Meta Ads! Iska AI Advantage Plus model sirf unhi customers ko target karta hai jinka buying intent high hai.'
    },
    {
        'id': 'funnel',
        'text': 'Meta Ads ek three-stage scaling funnel par kaam karta hai: Top par Cold Awareness, Middle par Consideration, aur Bottom par Direct Purchase!'
    },
    {
        'id': 'retarget',
        'text': 'Aur ninety-seven percent visitors jo pehli baar me nahi khareedte, Meta Pixel unhe retarget karta hai, jisse milta hai predictable 3X se 5X ROAS!'
    },
    {
        'id': 'cta',
        'text': 'Stop guessing, start scaling! Aaj hi apna Meta Ad funnel launch karo. Comment ya DM karo SCALE for free strategy blueprint!'
    }
]

async def gen():
    full_text = ' '.join(s['text'] for s in SCRIPT)
    comm = edge_tts.Communicate(full_text, VOICE, rate='+14%')
    cues = []
    audio_path = 'films/meta-ads-scale/audio/voiceover.mp3'
    cues_path = 'films/meta-ads-scale/audio/cues.json'
    
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
    
    with open(cues_path, 'w', encoding='utf-8') as f:
        json.dump(cues, f, indent=2, ensure_ascii=False)
    
    print('Generated', len(cues), 'sentence cues')
    for c in cues:
        print(f"{c['start']}s -> {c['end']}s: {c['text'][:45]}...")

if __name__ == '__main__':
    asyncio.run(gen())
