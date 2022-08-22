03/08/22
- Initial commit

04/08/22
- Fixed glaring misreference causing board.js not to load (i mistyped the name of a file)
- Added a config file with a load of settings (cool)
- Board tiles are now visible
- Updated the look of keyboard tiles (credit to inspect element :troll:)
- Added mousedown, mouseup, mouseover and mouseleave events to keyboard keys
- flexbox :)

05/08/22
- The board now actually displays letters (you can type with the onscreen keyboard)
- Added gamelogic (still not 100% accurate to the game) along with win and lose conditions
  - The board tiles also shade with ""animation"" to boot!
- Added a valid wordlist (but i don't have a wife to curate it, how sad)
- Added a list of potential answers that also change with each day 
- Made the to-do list

07/08/22
- Slowed down speed at which tiles' colours are revealed (100 -> 500ms)
- Added a magic line of code that optimises everything for mobile bro trust me 100% real

08/08/2022
- Title no longer uses KarnakCondensed
- Tied all attributes to a colour to a colour in a fixed (albeit unappealing) colour palette
  - e.g: boardBox now comes in different classes depending on the colour (there must be a better way surely) 

09/08/2022
- massive changes remember to update this tomorrow (today)
  - well that was a success now wasn't it? (15/08/2022)
- Added modals and a settings menu
- Added popups
- Added fade animation for tiles
- Misc CSS updates to rely less on px
- Broke CSS

15/08/2022
- Rolled back CSS and fully updated it to how it should've been (i am so good at changelogging)
- Removed modals, will probably just replace with a dropdown available at all times
- Added new colouring system
- Popups no longer centred for some reason
- Fixed fade animation for tiles
- Title now says WIP

16/08/2022
- Removed modal.js call in html

21/08/2022
- Recoded everything because of a bug i really didn't want to bother with :/
- took ~2 days lmao
- everything's a lot better now
  - e.g: board updates only when you click on the keyboard

22/08/2022
- Readded animations
  - DISABLE INPUT
  - in gamelogic, create a list that contains the correctness of each letter
  - cycle through them
  - colour code the keys
  - reenable input
- Added test answer list along with test definitions

TODO:
- Glitch => word still process even if it's not on the word list
- Backpedal on some graphic design so I don't get sued into oblivion (not that it's likely, but better safe than sorry ig)
- Create a well-kept, clean, modular popup system (this is 100% doable i swear)
- Modular theme system -> dark mode + other topic themes
- Get answer word list
- Get CSS to its previous state
- make it work on my phon :)
  - try and replace all the px in the css with % (yeah right)
