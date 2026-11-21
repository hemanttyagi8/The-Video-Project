import json

scenes = json.load(open('films/meta-ads-scale/audio/cues.json', encoding='utf-8'))
chunked_cues = []

phrase_map = {
    'scene1': [
        'Agar aapka business',
        'scale nahi ho raha...',
        'Toh problem product me nahi,',
        'Aapki reach me hai!'
    ],
    'scene2': [
        'Instagram par roz posts',
        'daalne se scale nahi hota.',
        'Meta Ads ka AI',
        'Laser-sharp targeting se',
        'Ideal buyers ko dhoondhta hai!'
    ],
    'scene3': [
        'Yeh kaam karta hai',
        'Ek proven 3-stage funnel par:',
        'Top par Awareness,',
        'Middle par Consideration,',
        'Aur Bottom par Purchase!'
    ],
    'scene4': [
        'Aur 97% log jo cart chhod gaye?',
        'Meta Pixel unhe retarget karta hai,',
        'Jisse milta hai',
        'Predictable 4X se 5X ROAS!'
    ],
    'scene5': [
        'Stop guessing, start scaling!',
        'Follow @megacrowdlab',
        'Aur aaj hi launch karo',
        'Apna high-ROI Meta ad campaign!'
    ]
}

for sc in scenes:
    phrases = phrase_map[sc['id']]
    total_words = sum(len(p.split()) for p in phrases)
    sc_start = sc['start']
    sc_dur = sc['end'] - sc['start']
    
    cur_t = sc_start
    for p in phrases:
        p_words = len(p.split())
        p_dur = (p_words / total_words) * sc_dur
        chunked_cues.append({
            'scene_id': sc['id'],
            'text': p,
            'start': round(cur_t, 2),
            'end': round(cur_t + p_dur, 2)
        })
        cur_t += p_dur

with open('films/meta-ads-scale/audio/word_cues.json', 'w', encoding='utf-8') as f:
    json.dump(chunked_cues, f, indent=2)

print(f'Generated {len(chunked_cues)} kinetic phrase cues!')
for c in chunked_cues:
    print(f"  {c['start']}s -> {c['end']}s: {c['text']}")
