import React from 'react'
import {Link} from "react-router-dom";

const AboutSteve = () => (
    <div className="well well-sm">
        <h2>Hmmm Steve</h2>
        <p>I have been developing software of one form or another since 1980. These days I work for KPMG Australia in a typical Microsoft technology environment, but that wasn't always the case</p>
        <p>Originally an electrician, I first wrote 'code' on a Gould Modicon programmable logic controller using ladder diagrams. I had never had so much fun in my life. The transition from circuit diagrams to ladder diagrams is an easy one to make.</p>
        <p>A friend introduced me to 'Basic' on a Commodore Vic 20, and although it was only one afternoon I was smitten by the immediacy of it. Instant gratification! Yay!</p>
        <p>Another friend had a Commodore Pet that was broken, so I fixed it and he gave it me. At the time, this was an awesome machine.
            I quickly found out that by typing |cpm I could get into a Unix like operating system for which there was a ton of professional software.</p>
        <p>I learned assembly language, but then discovered C, and eventually (on the strength of that) moved into technical computing at the BHP Westernport site, doing Ingres application development using embedded SQL in C & Unix for a living. vi rocks!</p>
        <p>I probably lived off C & SQL for about 10 years, VB6 and classic ASP for another 8 years, until I got into .NET, MVC, AngularJS and finally React</p>
        <p>I love working with React! It's the Lego of the web development world.</p>
        <p>Throughout all of this my loving wife Diana has put up with me not talking, spending 16 hours a day in front of a PC, and struggling almost evryday to learn some new damned thing.</p>
        <p>I have 2 beautiful children; my son Chris, and daughter Camilla, without whom none of this would have been worth the trouble.</p>
        <p>Chris in particular has been my guiding light in all things React. Every weekend he straightens me out on some aspect of the technology that I have simply failed to grasp. Chris it was who supplied the fix for the React Bootstrap LinkContainer and IndexLinkContainers which refused to work nicely with Rreact Router v4</p>
        <hr/>
        <h4><Link to="/">Home</Link></h4>
    </div>
)

export default AboutSteve