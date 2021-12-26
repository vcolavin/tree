Sort of a dwarf fortress idea.

Also an excuse for me to explore deno.

Notes as I go in the devlog folder.

To do:

- [x] Transition to browser (sorry Deno)
- [ ] Use a lightweight view library like Preact
- [x] Use a more robust persistent store

      - This isn't exactly solved but the transition to localStorage feels pretty good for now.

- [ ] Ticks and reconciliation
- [ ] Testing (once in browser)
- [ ] Add cursor which describes what's under the cursor
- [ ] Pause state
- [ ] Persisting/saving block state (shouldn't happen every tick, only on exit
      or like once every 60 ticks)
- [ ] It would be cool if the devlog could automagically publish somewhere
