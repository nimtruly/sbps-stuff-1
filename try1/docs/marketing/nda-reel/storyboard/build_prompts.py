"""Build self-contained storyboard prompts for the NDA reel.

Writes ../prompts.md (for copy-paste into Google Flow) and prompts.json
(for generate_images.py). Every prompt carries its full character,
setting, camera and style text, because Flow takes one prompt at a time.

Run: python build_prompts.py
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
REFS = Path(r"E:\Projects\_Commercial\SBPS_DOON\reels-made\frames_sel")

# ---------- reusable blocks ----------
CHAR = {
    "A": "Cadet A: a 15-year-old Indian boy, lean build, short neat black hair, clean-shaven, dark brown eyes; "
         "wearing a white polo T-shirt with a navy-blue collar and a small school crest on the chest, navy-blue track pants "
         "with a thin red side stripe, white sports shoes, and a teal mesh sports bib over the shirt printed with a large white number \"08\".",
    "B": "Teammate B: a 16-year-old Indian boy, taller and broader than Cadet A, short wavy black hair; same uniform "
         "(white polo T-shirt with navy collar, navy track pants with a red side stripe, white sports shoes) and a teal mesh bib with a large white number \"12\".",
    "JR": "Junior cadet: a 12-year-old Indian boy, small and slim, short black hair; white polo T-shirt with navy collar, "
          "navy track pants with a red side stripe, white sports shoes, teal mesh bib with a large white number \"21\".",
    "COACH": "Coach: a fit retired Indian Army instructor in his mid-50s, tanned skin, short grey hair, thick grey moustache, upright posture; "
             "wearing a black polo T-shirt, black track pants, a plain black baseball cap and a silver whistle on a black lanyard. No military uniform.",
    "OFFICER": "Interviewer: a retired Indian Army colonel in his early 60s, short grey hair, clean-shaven, calm and dignified; "
               "wearing a navy-blue blazer, a white shirt and a maroon tie.",
    "PARENT": "Parent: an Indian mother in her early 40s, medium build, hair tied in a low bun, a small red bindi; wearing a light-peach "
              "cotton salwar kameez with a printed dupatta over one shoulder, a thin gold bangle, and carrying a brown shoulder bag.",
    "SQUAD": "Squad: 8 to 10 Indian boys and girls aged 12 to 17, girls with plaited hair; all wearing white polo T-shirts with navy collars, "
             "navy track pants with red side stripes, white sports shoes and teal mesh bibs with large white numbers.",
    "NCC": "NCC cadets: Indian school boys and girls aged 14 to 17 in khaki NCC uniforms, dark green berets with red hackles, black belts and black boots.",
}
SET = {
    "ground": "Setting: a school training ground in Dehradun, India. Dusty brown-and-green field; white-painted steel obstacles "
              "(horizontal vault bars, an A-frame rope cargo net, low white balance beams, rope-climb poles); teal shade-net fencing; "
              "yellow school buses parked at the edge; a red-and-white four-storey school building; hazy Doon valley hills on the horizon.",
    "path": "Setting: a campus path beside the school training ground in Dehradun, India. Teal shade-net fence on one side, a red-and-white "
            "four-storey school building behind, white steel obstacles and students visible on the dusty ground beyond the fence.",
    "office": "Setting: a formal school office used for SSB-style mock interviews. Wood-panelled wall, a shelf with trophies, a polished "
              "wooden desk with papers and a closed laptop, a curtained window giving soft daylight.",
    "class": "Setting: a bright Indian school classroom. Rows of blue desks, tall windows with teal curtains, a green chalkboard and wall maps.",
    "hostel": "Setting: a clean Indian school hostel room. Two single steel beds with tightly folded blankets, a study table with books, "
              "a window with early-morning light.",
    "mess": "Setting: an Indian school dining hall. Long steel-topped tables, students eating from steel thalis of rice, dal and roti, big windows.",
    "aerial": "Setting: an Indian school campus in Dehradun seen from the air. A red-and-white four-storey building around a courtyard with a "
              "fountain, a large dusty training ground with white steel obstacles beside it, the city and hazy hills beyond.",
    "none": "",
}
STYLE = ("Style: vertical 9:16 photorealistic cinematic film still, teal-and-orange colour grade, natural skin tones, realistic "
         "Indian faces, fine film grain. No text, no captions, no watermark, no brand logos, no military insignia on students.")
LOOK = {
    "a16": "Camera look: full-frame cinema camera, 16mm ultra-wide lens, slight edge stretch, deep focus.",
    "a24": "Camera look: full-frame cinema camera, 24mm lens, natural perspective.",
    "a35": "Camera look: full-frame cinema camera, 35mm lens at f/2.8, shallow depth of field, creamy background blur.",
    "a35slow": "Camera look: full-frame cinema camera, 35mm lens at f/2.8, shot at 120fps slow motion, crisp frozen dust.",
    "zv24": "Camera look: APS-C camera, 24mm lens, natural perspective, moderate depth of field.",
    "zv50": "Camera look: APS-C camera, 50mm lens, tight framing, soft background blur.",
    "zv16": "Camera look: APS-C camera, 16mm wide lens, whole group in frame.",
    "oa4": "Camera look: action camera, ultra-wide lens with slight fisheye distortion, very low and close.",
    "oa4pov": "Camera look: chest-mounted action camera, first-person point of view, ultra-wide with slight fisheye and motion blur.",
    "x360": "Camera look: 360-degree camera reframed to 9:16, follow-cam on an invisible pole, wide and dynamic, slight motion blur.",
    "x360tiny": "Camera look: 360-degree camera tiny-planet projection, circular world, swirl motion blur.",
    "drone": "Camera look: drone aerial, 24mm-equivalent lens, smooth and stable.",
    "flat": "",
}

# ---------- shots ----------
# id, title, used_in, camera_note, ref_prefix, chars, setting, look, description
SHOTS = [
 ("P01","Fall, extreme close-up","S1 V1–V5 · S3 V1–V5","A7S3 35mm, 4K 120p, ground level","",["A"],"ground","a35slow",
  "Extreme close-up at ground level: Cadet A's face has just hit the dusty ground, cheek pressed into the dirt, eyes squeezed shut, mouth open in a gasp. Dust bursts up around his face in slow motion; part of his teal bib with the number 08 shows at his shoulder. A white balance beam is blurred behind. Golden-hour backlight makes the dust glow."),
 ("P02","Squad's shoes run past his face","S1 V1–V5 · S3 V1–V5","OA4 placed on the ground","P02",["SQUAD","A"],"ground","oa4",
  "Camera lying on the ground. The squad's white sports shoes and navy track pants with red stripes run past the lens left to right, kicking up dust. In the extreme foreground, Cadet A's blurred cheek and dusty hand lie on the dirt. School buses and the red building in the far background. Morning golden light, motion blur on the legs."),
 ("P03","Coach's boots stop beside him","S1 V2–V4","OA4 placed on the ground","P02_boots",["COACH","A"],"ground","oa4",
  "Ground-level shot. The Coach's black trainers and black track pants step into frame and stop right beside Cadet A's dusty hand lying on the ground. Dust settling, long low-sun shadows across the field."),
 ("P04","Coach stands over him, low angle","S1 V1 · S3 V1","A7S3 16mm, worm's-eye","P12_instructor",["COACH"],"ground","a16",
  "Worm's-eye low angle looking straight up at the Coach standing over the camera, looking down sternly but calmly, hands on hips, whistle hanging at his chest. Clear teal sky and the top of a white steel obstacle frame behind him. Golden-hour rim light."),
 ("P05","Teammate reaches down","S1 V2–V5 · S3 V2–V5","A7S3 16mm, low angle from the fallen cadet","P08_instructor-mentor",["B","COACH"],"ground","a16",
  "Low angle from the ground, as if from the fallen cadet's eyes. Teammate B leans down towards the camera with his right hand reaching out, the sun flaring behind his shoulder. Further back and softly blurred, the Coach watches with arms folded. Emotional, hopeful mood."),
 ("P06","Hands lock","S1 V2","ZV 50mm insert","",["A","B"],"ground","zv50",
  "Close-up insert of two hands gripping firmly: Cadet A's dusty hand and Teammate B's clean hand. Edges of their white polo sleeves and teal bibs are visible. Backlit by the golden sun, dust specks floating."),
 ("P07","Two cadets sprint back to the squad","S1 V1–V4 · S3 V1","360 follow-cam","P07",["A","B","SQUAD"],"ground","x360",
  "Follow-cam from behind and slightly above: Cadet A and Teammate B sprint side by side across the dusty ground towards the squad lined up ahead. Red-and-white school building and yellow buses in the background. Morning light, dynamic motion."),
 ("P08","Coach nods","S1 V2, V5 · S3 V2","ZV 50mm, slightly low","P08_instructor-watching",["COACH"],"ground","zv50",
  "Medium close-up of the Coach giving a small approving nod with a faint proud smile, whistle hanging at his chest. Students and the teal fence blurred behind. Warm golden light."),
 ("P09","Bar vault","S1–S3, all versions","A7S3 16mm, 4K 120p, low angle","P09",["A","SQUAD"],"ground","a16",
  "Low angle: Cadet A vaults over a horizontal white steel bar, frozen mid-air against a clear teal sky, legs tucked, hands on the bar. Two squad members wait their turn behind. Crisp action."),
 ("P10","Cargo-net climb","S1 V1–V3, V5 · S2 V4 · S3 V4–V5","OA4 mounted at the top of the net","P10",["SQUAD"],"ground","oa4",
  "Action camera fixed at the top of a white A-frame rope cargo net, looking down: three squad members climb up towards the lens with determined faces, hands gripping thick rope. Sun flare at the frame edge, dusty ground far below."),
 ("P11","Balance-beam walk","optional B-roll","A7S3 35mm, side","P11",["SQUAD"],"ground","a35",
  "Side view: a 14-year-old girl from the squad, hair in a plait, teal bib number 02, walks a low white balance beam with arms stretched out, focused. Teal shade-net fence and the red school building behind."),
 ("P12","Ex-army instructor briefing the squad","S1–S3, all versions","ZV 16mm","P12",["COACH","SQUAD"],"class","zv16",
  "Eye-level wide shot: the Coach points with a thin stick at a whiteboard showing a hand-drawn obstacle plan, while six squad members sit on chairs facing him, seen from behind with their teal bib numbers visible."),
 ("P13","GTO group task","S1 V3–V5 · S2 V2–V5 · S3 V2–V5","DRONE top-down","P13",["SQUAD"],"ground","drone",
  "Top-down aerial: five squad members work together to carry a wooden plank across two white steel stands inside a painted no-touch boundary, like an SSB group-task obstacle. Long morning shadows, clean geometry, teamwork."),
 ("P14","Written mock test in class","S1–S3, all versions","ZV 24mm, high angle","P14",["SQUAD"],"class","zv24",
  "High-angle view over rows of desks: squad members wearing their teal numbered bibs write an exam on answer sheets, heads down, focused. Sunlight from the tall windows."),
 ("P15","Mock test papers being checked","S2 V2–V3 · S3 V2–V3","ZV 50mm insert","P19_writing",[],"class","zv50",
  "Close-up insert: a teacher's hand marks a multiple-choice answer sheet with a red pen, ticks down the margin and a score circled at the top. A stack of answer sheets beside it, warm desk light."),
 ("P16","Mock interview room, wide","S1 V1–V5 · S2 V1–V2 · S3 V1–V4","A7S3 24mm, eye level","P16",["OFFICER","A"],"office","a24",
  "Wide two-shot at eye level: the Interviewer sits behind the wooden desk, hands clasped, facing Cadet A who sits upright on a chair in front of the desk, back straight, hands on knees. Serious but warm mood."),
 ("P17","Interviewer close-up","S1 V3 · S3 V3, V5","ZV 50mm","P17",["OFFICER"],"office","zv50",
  "Close-up of the Interviewer, hands clasped on the desk, leaning slightly forward and asking a question with a calm, probing look. Trophy shelf blurred behind."),
 ("P18","Cadet A answers","S1 V3 · S2 V3 · S3 V3, V5","A7S3 35mm f/2.8","P18",["A"],"office","a35",
  "Medium close-up of Cadet A sitting upright, answering with quiet confidence and a slight smile, eyes looking just off-camera at the interviewer. A curtain and a wooden panel blurred behind."),
 ("P19","Psych test writing","S1 V2","ZV 50mm, top-down","P19",["A"],"class","zv50",
  "Top-down close-up: Cadet A's hand writes quickly in a ruled notebook with a blue pen, a short story beneath a small sketched picture prompt; the edge of his teal bib is visible."),
 ("P20","Fitness: push-ups","S1 V1–V4 · S2 V2 · S3 V2–V3, V5","A7S3 16mm, ground level","P20",["SQUAD"],"ground","a16",
  "Ground-level low angle at dawn: a line of squad members doing push-ups on the grass, the nearest boy's strained face close to the lens, the rest receding in a line, the red school building behind in morning haze."),
 ("P21","NCC parade","S1 V2 · S2 V4 · S3 V2, V4","DRONE oblique","P21",["NCC"],"ground","drone",
  "High oblique aerial: NCC cadets march in a neat formation across the dusty parade ground, arms swinging in unison, an adult instructor at the front. White obstacles and the teal fence at the edges, long morning shadows."),
 ("P22","Hostel room","S1–S3, most versions","A7S3 16mm","P22",["A"],"hostel","a16",
  "Wide shot of the hostel room: Cadet A, wearing a navy-blue tracksuit jacket over his white polo, sits on the edge of a neatly made bed tying his white shoes, early light through the window. Calm and disciplined."),
 ("P23","Mess dining","S2 V4 · S3 V4","A7S3 16mm, slightly high","P23",["SQUAD"],"mess","a16",
  "Slightly high wide shot: squad members, without bibs, in white polo T-shirts sit along a long steel table eating from steel thalis, chatting and smiling. Warm window light, clean and busy."),
 ("P24","He clears the beam, high-five","S1 V2, V4, V5 · S3 V2, V4","360 side follow or A7S3 4K 120p","P24",["A","B","COACH"],"ground","x360",
  "Side tracking shot: Cadet A runs across a low white balance beam at full speed and leaps off the end; Teammate B raises his hand for a high-five; the Coach watches in the background. Dust in the air, golden-hour backlight, triumphant mood."),
 ("P25","End-card aerial","every version","DRONE","P25",[],"aerial","drone",
  "Golden-hour aerial of the whole campus with a calm sky, leaving empty space in the top third of the frame for text."),
 ("P26","Parent's hands with coaching flyers","S2 V2–V5 · S3 V4","ZV 50mm, top-down","",["PARENT"],"path","zv50",
  "Top-down close-up of the Parent's hands, with her thin gold bangle, fanning out three colourful printed coaching flyers with generic designs and no readable brand names; the edge of her dupatta in frame, the dusty path softly blurred below."),
 ("P27","Parent's head snaps round","S2 V1–V4 · S3 V4","A7S3 35mm f/2.8","",["PARENT"],"path","a35",
  "Medium close-up: the Parent, holding flyers, turns her head sharply towards an off-screen sound, eyebrows raised, curious. The red school building blurred behind. Warm golden light."),
 ("P28","Parent's view through the fence","S2 V1–V3, V5","A7S3 24mm, over the shoulder","P11",["PARENT","SQUAD"],"path","a24",
  "Over-the-shoulder shot through the teal shade-net fence: the Parent's blurred shoulder and dupatta in the foreground; beyond the fence, squad members vault bars and climb the cargo net on the training ground."),
 ("P29","Late student runs past the parent","S2 V1–V3, V5 · S3 V2","360 follow-cam","P07",["A","PARENT"],"path","x360",
  "Tracking alongside: Cadet A, a school bag bouncing on one shoulder, runs past the Parent standing by the fence on the campus path. Motion blur, late-morning energy."),
 ("P30","Parent asks, two-shot","S2 V1–V2 · S3 V1–V2","ZV 24mm, eye level","",["PARENT","A"],"path","zv24",
  "Medium two-shot at eye level: the Parent, holding flyers, asks Cadet A a question; he has paused mid-run, slightly out of breath, listening politely. Teal fence and the training ground behind. Friendly mood."),
 ("P31","Student jogs backwards, grinning","S2 V2–V4 · S3 V2–V5","360 follow-cam, moving backwards with him","",["A"],"path","x360",
  "Follow-cam in front of the subject: Cheeky Cadet A jogs backwards, grinning and pointing with his thumb at the training ground behind him, talking to someone out of frame. Obstacles and the squad visible behind him. Playful, bright light."),
 ("P32","Coach shouts \"Team, assemble!\"","S2 V1–V5 · S3 V1–V5","A7S3 24mm, low angle","P48",["COACH"],"ground","a24",
  "Low-angle medium close-up: the Coach shouts a command with one arm raised high, whistle near his lips, veins showing on his neck. Clear teal sky behind. Strong golden-hour rim light."),
 ("P33","Student falls into line","S2 V1–V4 · S3 V1","DRONE low, high angle","P47",["SQUAD","A"],"ground","drone",
  "Low aerial at about 10 metres, high angle: the squad stands in one straight line on the dusty ground while Cadet A sprints into the last gap at the end of the line. Long morning shadows, white obstacles around."),
 ("P34","Parent folds the flyers away","S2 V2–V5 · S3 V2–V5","ZV 50mm","",["PARENT"],"path","zv50",
  "Close-up: the Parent smiles softly, relieved, while folding the colourful coaching flyers into her brown shoulder bag, a smartphone in her other hand. Training ground and students blurred behind. Golden light."),
 ("P35","Over the parent's shoulder, watching the fall","S3 V2–V5","A7S3 35mm, over the shoulder","",["PARENT","A","B","COACH"],"path","a35",
  "Over-the-shoulder shot: the Parent's soft-focus shoulder and dupatta at the teal fence in the foreground, flyers in her hand. In sharp focus beyond the fence, Teammate B pulls Cadet A up from the dusty ground while the Coach watches."),
 ("P36","Parent at the interview-room door","S2 V3 · S3 V3, V5","A7S3 24mm, through the doorway","P16_interview-room",["PARENT","A","OFFICER"],"office","a24",
  "Over-the-shoulder shot through a half-open wooden door: the Parent's shoulder and dupatta in the foreground, a flyer in her hand. Inside the office, Cadet A sits upright before the Interviewer at the wooden desk. Quiet emotional moment."),
 ("P37","Parent walks with a poster (V1)","S2 V1 · S3 V1","360 follow-cam","",["PARENT"],"path","x360",
  "Tracking alongside: the Parent walks along the campus path holding a rolled coaching poster and a folded brochure, looking slightly tired and preoccupied."),
 ("P38","Drone reveal of the training ground","S2 V4","DRONE descending","P38",["SQUAD"],"aerial","drone",
  "Aerial descending over the red-and-white school building to reveal the large dusty training ground behind it, the squad spread across the white obstacles: cargo net, vault bars, balance beams. Golden morning light."),
 ("P39","Chest-mount POV run","S1 V4 · S3 V4","OA4 chest mount","P39",["SQUAD"],"ground","oa4pov",
  "First-person view running fast across the dusty training ground behind the squad, towards the white balance beams; the runner's own arms in white polo sleeves pump at the bottom edges of the frame. Dawn light."),
 ("P40","POV fall","S1 V4","OA4 chest mount, 4K 120p","",[],"ground","oa4pov",
  "First-person view tilting sharply towards the ground as the runner trips: the dusty ground rushes up close, two hands in white polo sleeves slap down into the dirt, dust bursting up. Harsh morning sun."),
 ("P41","POV: a hand reaches in","S1 V4","OA4 from the ground, looking up","",["B","COACH"],"ground","oa4",
  "First-person view from the ground looking up: Teammate B leans into the frame reaching his hand straight towards the lens, the sun flaring behind his head; the Coach stands softly blurred in the background."),
 ("P43","Phone search insert","S2 V4 · S3 V4","ZV 50mm, over the shoulder","",["PARENT"],"path","zv50",
  "Over-the-shoulder close-up: the Parent's thumb scrolls a smartphone showing a list of blurred, unreadable search results; a colourful coaching flyer is in her other hand. Campus path softly blurred behind."),
 ("P44","Parent testimonial","S2 V5","A7S3 35mm f/2.8 (main), ZV 50mm (second angle)","",["PARENT","SQUAD"],"path","a35",
  "Documentary interview framing, medium close-up, three-quarter profile: the Parent stands at the teal fence speaking to someone just off-camera with warm pride. Behind her, out of focus, the squad trains on the white obstacles. Soft golden light."),
 ("P46","360 rewind transition","S3 V5","360 tiny planet","P25_aerial-campus-dawn",["SQUAD"],"ground","x360tiny",
  "A round tiny-planet image of the training ground with white obstacles and tiny squad members, curving into the sky with the red school building wrapped around the edge, caught mid-spin."),
 ("P47","Squad in formation, top-down","S1 V5","DRONE top-down","P47",["SQUAD"],"ground","drone",
  "Top-down aerial: the squad stands in three neat rows on the dusty ground, long morning shadows stretching sideways, white obstacles at the edge. Geometric and disciplined."),
 ("P48","Whistle silhouette (spare)","spare B-roll","A7S3 35mm into the sun","P48",["COACH"],"ground","a35",
  "Silhouette of the Coach blowing his whistle against a low orange sunrise, the sun peeking past his shoulder, hazy city skyline below. High contrast, dramatic."),
 ("P49","Flag (spare)","spare B-roll","A7S3 16mm, low angle","P49",[],"ground","a16",
  "Low-angle close-up of the Indian national flag waving on a white pole against a clear teal sky, hills behind, golden light on the fabric."),
 ("P50","Dawn run silhouette","S1 V5","A7S3 16mm, low light","P50",["SQUAD"],"ground","a16",
  "Wide shot at dawn: silhouettes of the squad running in a single line across the training ground against an orange-pink sky, the red school building dark in the background, atmospheric haze."),
]

POSTERS = [
 ("PO1","Made-up academy poster (S2-V1, S3-V1 only)",
  "Vertical A2 printed poster for a fictional Indian defence coaching institute named \"RANNVEER DEFENCE CLASSES\". Typical Indian coaching-advert style: deep blue and red background, big gold headline \"NDA · CDS · SSB COACHING\", subline \"ADMISSION OPEN 2027\", three illustrated silhouettes of cadets saluting (no real faces, no real military insignia or emblems), small icons with labels \"Expert Faculty\", \"Daily Tests\", \"Physical Training\", a placeholder phone number \"98XXX XXXXX\" and the word \"Dehradun\". Busy layout, glossy print texture, photographed flat, vertical 9:16 crop.",
  "Check that no real academy in Dehradun uses this name before printing."),
 ("PO2","Made-up academy tri-fold brochure (S2-V1, S3-V1 only)",
  "Flat-lay photo of an opened glossy tri-fold brochure for a fictional Indian defence coaching institute named \"RANNVEER DEFENCE CLASSES\", in blue and red. Panels headed \"Why Join Us\", \"Courses: NDA / CDS / SSB\" and \"Hostel Available\", with cartoon icons of books, a running track and a medal, grey placeholder silhouettes instead of student photos, and a placeholder phone \"98XXX XXXXX\". Lying on a plain wooden table, soft daylight, vertical 9:16.",
  "Same name check as PO1."),
 ("PO3","Generic flyer, red and yellow (V2+)",
  "Flat A5 printed flyer, photographed straight on. No brand name, no logo, no phone number. Red background, bold yellow text \"DEFENCE COACHING\" and \"ADMISSION OPEN\", a white silhouette of a running cadet, small generic icons of a book and a stopwatch. Typical Indian street-flyer design, slightly creased paper texture, vertical 9:16.",
  ""),
 ("PO4","Generic flyer, blue and white (V2+)",
  "Flat A5 printed flyer, photographed straight on. No brand name, no logo, no phone number. Navy-blue background, bold white text \"NDA · SSB COACHING\", an orange ribbon reading \"LIMITED SEATS\", an outline illustration of an obstacle course and a saluting silhouette. Indian coaching-flyer style, glossy paper texture, vertical 9:16.",
  ""),
 ("PO5","Generic flyer, green and orange (V2+)",
  "Flat A5 printed flyer, photographed straight on. No brand name, no logo, no phone number. Green-to-orange gradient, bold text \"SAINIK SCHOOL & NDA FOUNDATION\" and \"NEW BATCH\", generic book and pencil icons, star bursts. Busy Indian tuition-flyer layout, matte paper texture, vertical 9:16.",
  ""),
 ("PO6","Phone search screen (S2-V4, S3-V4)",
  "Vertical 9:16 smartphone screen mockup of a generic search-results page, light theme. The search bar reads \"NDA coaching near me\". Below it, six listing cards with made-up names (\"Shaurya Path Academy\", \"Veer Bhumi Classes\", \"Defence Pro Institute\"), star ratings and grey map pins, all slightly blurred. No real search-engine logo or brand.",
  "Check none of the made-up names is a real Dehradun academy, or blur all names."),
 ("EC1","End-card background (all versions)",
  "Vertical 9:16 end-card background: golden-hour aerial of a red-and-white four-storey Indian school campus around a courtyard with a fountain, a large dusty training ground with white steel obstacles beside it, hazy Dehradun hills beyond. A soft navy-blue gradient darkens the top and bottom thirds, leaving clean empty space for white headline text and a logo. Cinematic teal-and-orange grade, no text.",
  ""),
]

ORDER = [
 ("S1-V1","P01 · P02 · P04 · P07 · P09 · P10 · P12 · P14 · P16 · P20 · P25"),
 ("S1-V2","P01 · P02 · P03 · P05 · P06 · P08 · P07 · P09 · P10 · P12 · P14 · P16 · P19 · P20 · P21 · P22 · P24 · P25"),
 ("S1-V3","P01 · P02 · P03 · P05 · P07 · P09 · P10 · P12 · P13 · P14 · P20 · P22 · P16 · P17 · P18 · P17 · P18 · P01"),
 ("S1-V4","P39 · P40 · P02 · P03 · P41 · P39 · P09 · P13 · P12 · P14 · P22 · P39 · P24 · P25"),
 ("S1-V5","P01 · P02 · P05 · P08 · P50 · P10 · P14 · P16 · P47 · P24 · P01 · P05 · P08 · P25"),
 ("S2-V1","P37 · P27 · P28 · P29 · P30 · P09 · P12 · P13 · P14 · P16 · P22 · P32 · P33 · P25 (posters PO1, PO2)"),
 ("S2-V2","P26 · P27 · P28 · P29 · P30 · P31 · P09 · P14 · P13 · P16 · P12 · P15 · P20 · P22 · P31 · P32 · P33 · P34 · P25 (flyers PO3–PO5)"),
 ("S2-V3","P26 · P27 · P28 · P31 · P09 · P13 · P12 · P14 · P15 · P22 · P36 · P18 · P32 · P29 · P34 · P25"),
 ("S2-V4","P43 · P27 · P38 · P31 · P10 · P13 · P12 · P14 · P16 · P21 · P23 · P32 · P33 · P43 · P34 · P25 (screen PO6)"),
 ("S2-V5","P44 · P26 · P44 · P28 · P09 · P14 · P13 · P12 · P22 · P44 · P29 · P32 · P44 · P25"),
 ("S3-V1","P01 · P02 · P04 · P07 · P37 · P30 · P09 · P12 · P13 · P14 · P16 · P22 · P32 · P33 · P25 (posters PO1, PO2)"),
 ("S3-V2","P01 · P02 · P35 · P05 · P08 · P29 · P30 · P31 · P09 · P13 · P16 · P12 · P14 · P15 · P20 · P21 · P22 · P32 · P24 · P34 · P25"),
 ("S3-V3","P01 · P02 · P35 · P05 · P31 · P09 · P13 · P12 · P14 · P15 · P20 · P22 · P36 · P17 · P18 · P17 · P18 · P34 · P25 · P01"),
 ("S3-V4","P26+P39 · P43+P10 · P27+P01 · P35 · P31 · P09 · P13 · P16 · P12 · P14 · P21 · P23 · P32 · P24 · P25 (screen PO6)"),
 ("S3-V5","P18 · P36 · P46 · P01 · P02 · P05 · P35 · P31 · P09 · P10 · P13 · P12 · P14 · P20 · P22 · P36 · P17 · P18 · P34 · P25 · P18"),
]


def full_prompt(chars, setting, look, desc):
    parts = ["Vertical 9:16 cinematic storyboard frame.", desc]
    if chars:
        parts.append("Characters in this shot — " + " ".join(CHAR[c] for c in chars))
    if SET[setting]:
        parts.append(SET[setting])
    if LOOK[look]:
        parts.append(LOOK[look])
    parts.append(STYLE)
    return " ".join(parts)


def refs_for(prefix):
    if not prefix or not REFS.exists():
        return []
    return sorted(str(p) for p in REFS.glob(prefix + "*.jpg"))[:2]


def main():
    data, md = [], []
    md += [
        "# NDA reel: storyboard and poster prompts (Google Flow)",
        "",
        "Every prompt below is complete on its own. It carries the full character, setting, camera and style text, so you can paste any one straight into Google Flow.",
        "",
        "- **Board IDs** match the **Board** column in `S1-the-fall.md`, `S2-the-parent.md` and `S3-combined.md`.",
        "- **Reference frame:** the matching image from SBPS's earlier reels, in `E:\\Projects\\_Commercial\\SBPS_DOON\\reels-made\\frames_sel\\`. Upload it in Flow as an image reference to match the look.",
        "- **Generated by** `storyboard/build_prompts.py`. Edit the data in that file and run it again, rather than editing this file by hand.",
        "- **Batch generation:** `storyboard/generate_images.py` creates all of these images through the Gemini API (see `storyboard/README.md`).",
        "",
        "## Shot prompts",
        "",
    ]
    for sid, title, used, cam, ref, chars, setting, look, desc in SHOTS:
        prompt = full_prompt(chars, setting, look, desc)
        r = refs_for(ref)
        data.append({"id": sid, "title": title, "kind": "shot", "prompt": prompt, "refs": r})
        md += [f"### {sid}: {title}",
               f"Used in: {used} · Real camera: {cam} · Reference: {', '.join(Path(x).name for x in r) or 'none'}",
               "", "```text", prompt, "```", ""]
    md += ["## Poster and prop prompts", "",
           "Fix any garbled text in Canva before printing.", ""]
    for pid, title, prompt, note in POSTERS:
        data.append({"id": pid, "title": title, "kind": "poster", "prompt": prompt, "refs": []})
        md += [f"### {pid}: {title}", "", "```text", prompt, "```"]
        if note:
            md += [f"**Before printing:** {note}"]
        md += [""]
    md += ["## Storyboard order per version", "", "| Version | Board IDs in order |", "|---|---|"]
    md += [f"| {v} | {o} |" for v, o in ORDER]
    (HERE.parent / "prompts.md").write_text("\n".join(md) + "\n", encoding="utf-8")
    (HERE / "prompts.json").write_text(json.dumps(data, indent=1, ensure_ascii=False), encoding="utf-8")
    print(f"{len(data)} prompts written")


if __name__ == "__main__":
    main()
