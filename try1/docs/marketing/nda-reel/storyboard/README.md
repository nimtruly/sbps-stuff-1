# Storyboard image generation

| File | What it does |
|---|---|
| `build_prompts.py` | Holds the shot, character, setting and poster data. Run it to rebuild `../prompts.md` and `prompts.json` |
| `prompts.json` | All 55 prompts, each with its reference-frame paths, for the batch script |
| `generate_images.py` | Sends every prompt to the Gemini API and saves the images in `out/` |
| `out/` | Generated images (not committed) |

## Quick start (PowerShell)

1. Get an API key at <https://aistudio.google.com/apikey>. Image models need billing turned on.
2. Set the key for this terminal session:

   ```powershell
   $env:GEMINI_API_KEY = "paste-your-key"
   ```

3. Check what will run (this makes no API calls):

   ```powershell
   python docs/marketing/nda-reel/storyboard/generate_images.py --dry-run
   ```

4. Test with 3 frames first:

   ```powershell
   python docs/marketing/nda-reel/storyboard/generate_images.py --only P01,P05,PO3
   ```

5. Generate the rest. Frames that already exist in `out/` are skipped:

   ```powershell
   python docs/marketing/nda-reel/storyboard/generate_images.py
   ```

## Options

- `--variants 2`: two takes per frame, saved as `_v1` and `_v2`.
- `--engine imagen`: use Imagen instead of Gemini. Imagen doesn't take reference frames.
- `--model NAME`: use a newer model name if Google has released one.
- `--no-refs`: don't send the reference frames from `frames_sel`.
- `--kind poster`: only the posters and props (PO1–PO6, EC1).

## Notes

- **Default model:** `gemini-2.5-flash-image`. It accepts one reference frame per shot, which keeps the look close to SBPS's earlier reels.
- **Names change:** if Google renames the model, pass the new name with `--model`.
- **Cost:** check current pricing at <https://ai.google.dev/pricing>. All 55 frames are one small batch.
- **Text in images:** AI text is often wrong, so fix poster text in Canva.
