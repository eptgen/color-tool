import React from 'react';
import colorpop from './assets/colorpop.png';
import greypop from './assets/greypop.png';

const Home = () => {
  return (
    <div>

        <section id="main-content">Our Research</section>
            <section id="description">
                <div style={{width: "50%", float: "left"}}>
                    <p>What  can  be  done  for  classic  retro  video games  that  were  designed  without  accessibility  in  mind? When a retro game is played on its original hardware, the gamer  is  typically  limited  to  color  adjustments  on  their display (e.g. cathode ray tube television). When played on a computer, the operating system or emulator may provide additional  support.  While  these  types  of  adjustments  may help,  they  are  typically  limited  to  helping  one  gamer  at  a time. For this reason, we are interested in adjusting the colors in retro games themselves, thereby making the accessibility enhancement more widely available. Furthermore, our aim is to create automated tools for this purpose. Our color tool allows users to modify the color palettes in NES games, specifically black box games!</p>
                </div>
                <img src={colorpop}/>
                <img src={greypop}/>
            </section>

        <section id="main-content1">NES Blackbox Games</section>
            <section id="blackbox">
                <p>The NES Blackbox Games are a collection of 30 games released by Nintendo between the years 1985 and 1987. What makes the Black Box series so intriguing is their similar style of programming-which brought simple graphics and the beginning of iconic characters like Mario and Luigi. The games were all packaged in Black Boxes. To our research team, the games provided a perfect template for our tool. Though some are more complex than others, all of the games share the same limitations in sprite and palette design, and variants of cartridges. In each BlackBox game there can be up to 64 sprites, 54 different colors, and the resolution in 256-by-240 pixels. Thus, as a team, we could examine each game’s palette with a baseline search. That baseline would be an address 3F, followed by four bytes. In almost every BlackBox game, a palette could be located. This similarity, and the differences it revealed, interested our team. In our continued research, we discovered that there are levels of complexity for each game's palette information, and discussed this in our journal. (maybe put link here)</p>
            </section>

            <div class="grid-container">
                <div class="grid-item"><a href="blackboxgames#10">10-Yard Fight</a></div>
                <div class="grid-item"><a href="blackboxgames#bb">Baseball</a></div>
                <div class="grid-item"><a href="blackboxgames#cc">Clu Clu Land</a></div>
                <div class="grid-item"><a href="blackboxgames#duck">Duck Hunt</a></div>
                <div class="grid-item"><a href="blackboxgames#excite">Excitebite</a></div>
                <div class="grid-item"><a href="blackboxgames#golf">Golf</a></div>
                <div class="grid-item"><a href="blackboxgames#gyro">Gyromite</a></div>
                <div class="grid-item"><a href="blackboxgames#hogan">Hogan's Alley</a></div>
                <div class="grid-item"><a href="blackboxgames#ice">Ice Climber</a></div>
                <div class="grid-item"><a href="blackboxgames#kungfu">Kung Fu</a></div>
                <div class="grid-item"><a href="blackboxgames#pin">Pinball</a></div>
                <div class="grid-item"><a href="blackboxgames#soccer">Soccer</a></div>
                <div class="grid-item"><a href="blackboxgames#stack">Stack-Up</a></div>
                <div class="grid-item"><a href="blackboxgames#smb">Super Mario Bros.</a></div>
                <div class="grid-item"><a href="blackboxgames#tennis">Tennis</a></div>
                <div class="grid-item"><a href="blackboxgames#wild">Wild Gunman</a></div>
                <div class="grid-item"><a href="blackboxgames#wreck">Wrecking Crew</a></div>
                <div class="grid-item"><a href="blackboxgames#dk">Donkey Kong</a></div>
                <div class="grid-item"><a href="blackboxgames#dk3">Donkey Kong 3</a></div>
                <div class="grid-item"><a href="blackboxgames#dkj">Donkey Kong Jr.</a></div>
                <div class="grid-item"><a href="blackboxgames#dkjm">Donkey Kong Jr. Math</a></div>
                <div class="grid-item"><a href="blackboxgames#mario">Mario Bros.</a></div>
                <div class="grid-item"><a href="blackboxgames#pop">Popeye</a></div>
                <div class="grid-item"><a href="blackboxgames#balloon">Balloon Fight</a></div>
                <div class="grid-item"><a href="blackboxgames#gumshoe">Gumshoe</a></div>
                <div class="grid-item"><a href="blackboxgames#mach">Mach Rider</a></div>
                <div class="grid-item"><a href="blackboxgames#urban">Urban Champion</a></div>
                <div class="grid-item"><a href="blackboxgames#slalom">Slalom</a></div>
                <div class="grid-item"><a href="blackboxgames#volley">Volleyball</a></div>
                <div class="grid-item"><a href="blackboxgames#pro">Pro-Wrestling</a></div>
            </div>

        <section id="main-content1">Analytics</section>
            <section id="blackbox">
                <p>FDS vs NES: There are ten Blackbox games that also saw releases on the Famicom Disk System. The Famicom Disk System runs on Nintendo’s Family Computer Home video game console. The Famicom Disk System allowed users to play the Blackbox games in Japan on an NES equivalent add on, despite the NES in America, Japan’s FDS was notable mainly due to its ability to save games.


                Game With Most Palettes: Gumshoe, with 75 palettes.


                Game With Least Palettes: Mario Bros, with 2 palettes.


                </p>
        </section>

        <footer>
                Summer Research, 2021.
        </footer>
  </div>
  )
}

export default Home;
