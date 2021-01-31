(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{15:function(e,t,a){},16:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var o=a(0),s=a(1),n=a.n(s),i=a(9),r=a.n(i),l=(a(15),a(2)),h=a(3),u=a(5),c=a(4),m=(a(16),function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(){return Object(l.a)(this,a),t.call(this)}return Object(h.a)(a,[{key:"render",value:function(){return Object(o.jsxs)("div",{id:"introScreen",children:[Object(o.jsx)("h1",{children:"This is the intro screen!"}),Object(o.jsx)("button",{onClick:this.props.onClick,children:"Start Game"})]})}}]),a}(n.a.Component)),d=(a(18),function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).onClickSelectRats=function(){e.props.setActiveRats(e.state.selectedRats),e.props.advanceState()},e.state={selectedRats:[],selectRatsButton:""},e}return Object(h.a)(a,[{key:"selectRat",value:function(e,t){var a=document.getElementById(t);if(-1!=this.state.selectedRats.indexOf(e)){var s=this.state.selectedRats.indexOf(e),n=this.state.selectedRats;return n.splice(s,1),this.setState({selectedRats:n}),a.classList.remove("selectedRat"),void this.setState({selectRatsButton:""})}if(this.state.selectedRats.length!==this.props.numRatsInGame){if(this.state.selectedRats.push(e),a.classList.add("selectedRat"),this.state.selectedRats.length===this.props.numRatsInGame){var i=Object(o.jsx)("button",{onClick:this.onClickSelectRats,children:"Select Rats"});this.setState({selectRatsButton:i})}else this.setState({selectRatsButton:""});this.setState({})}}},{key:"render",value:function(){for(var e=this,t=[],a=function(a){t.push(Object(o.jsx)("div",{id:"rat".concat(a),className:"ratList",onClick:function(){e.selectRat(e.props.rats[a].name,"rat".concat(a))},children:"".concat(e.props.rats[a].name)},a))},s=0;s<this.props.rats.length;s++)a(s);return Object(o.jsxs)("div",{id:"ratSelectScreen",children:[Object(o.jsxs)("div",{children:["Select your rats for the game (choose ","".concat(this.props.numRatsInGame),"):"]}),t,Object(o.jsxs)("div",{children:["Chosen: ",this.state.selectedRats.join(",")]}),this.state.selectRatsButton]})}}]),a}(n.a.Component)),y=a(7),g=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(e){var o;return Object(l.a)(this,a),(o=t.call(this,e)).ratNames=e.activeRatNames.sort((function(e,t){return.5-Math.random()})),o.activeRats=o.ratNames.map((function(e){return o.props.getRatByName(e)})),o.responses=y,o.state={ratIndex:0},o}return Object(h.a)(a,[{key:"submitResponse",value:function(){var e=this.state.ratIndex+1;e===this.ratNames.length?this.props.goToRoseCeremony():this.setState({ratIndex:e})}},{key:"getRandomResponses",value:function(){y.sort((function(){return.5-Math.random()}));for(var e=[],t=0;t<3;t++){var a=y[t],s=Object(o.jsx)("button",{onClick:this.submitResponse.bind(this),children:a},t);e.push(s)}return e}},{key:"render",value:function(){var e=this.getRandomResponses(),t=this.activeRats[this.state.ratIndex].dialogue[this.props.round];return Object(o.jsxs)("div",{id:"talkingToRatsScreen",children:["talking to rat #","".concat(this.state.ratIndex+1)," out of ","".concat(this.ratNames.length),Object(o.jsx)("br",{}),Object(o.jsxs)("div",{id:"ratName",children:[this.activeRats[this.state.ratIndex].name,":"]}),Object(o.jsx)("br",{}),t,e]})}}]),a}(n.a.Component),f=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(e){var o;return Object(l.a)(this,a),(o=t.call(this,e)).ratNames=e.activeRatNames.sort((function(e,t){return.5-Math.random()})),o.activeRats=o.ratNames.map((function(e){return o.props.getRatByName(e)})),o.numRoses=o.props.numRoses,o.state={selectedRats:[],giveRosesButton:""},o}return Object(h.a)(a,[{key:"selectRat",value:function(e,t){var a=document.getElementById(t);if(-1!=this.state.selectedRats.indexOf(e)){var s=this.state.selectedRats.indexOf(e),n=this.state.selectedRats;return n.splice(s,1),this.setState({selectedRats:n}),a.classList.remove("selectedRat"),void this.setState({giveRosesButton:""})}if(this.state.selectedRats.length!==this.numRoses){if(this.state.selectedRats.push(e),a.classList.add("selectedRat"),this.state.selectedRats.length===this.numRoses){var i=Object(o.jsx)("button",{onClick:this.endRoseCeremony.bind(this),children:"Give roses"});this.setState({giveRosesButton:i})}else this.setState({giveRosesButton:""});this.setState({})}}},{key:"endRoseCeremony",value:function(){this.props.setActiveRats(this.state.selectedRats),this.props.advanceState()}},{key:"render",value:function(){for(var e=this,t=[],a=function(a){t.push(Object(o.jsx)("div",{id:"rat".concat(a),className:"ratList",onClick:function(){e.selectRat(e.activeRats[a].name,"rat".concat(a))},children:"".concat(e.activeRats[a].name)},a))},s=0;s<this.activeRats.length;s++)a(s);return Object(o.jsxs)("div",{id:"roseCeremonyScreen",children:["Rose ceremony: Select ","".concat(this.props.numRoses)," rats",t,Object(o.jsxs)("div",{children:["Chosen: ",this.state.selectedRats.join(",")]}),this.state.giveRosesButton]})}}]),a}(n.a.Component),v=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(e){return Object(l.a)(this,a),t.call(this,e)}return Object(h.a)(a,[{key:"render",value:function(){return Object(o.jsxs)("div",{id:"animeEndingScreen",children:["You chose ","".concat(this.props.finalRat.name),":",Object(o.jsx)("br",{}),this.props.finalRat.dialogue[this.props.finalRat.dialogue.length-1],Object(o.jsx)("button",{onClick:this.props.restartGame,children:"Restart Game"})]})}}]),a}(n.a.Component),w=a(6),b=function(e){Object(u.a)(a,e);var t=Object(c.a)(a);function a(){var e;return Object(l.a)(this,a),(e=t.call(this)).numRatsInGame=6,e.numRounds=5,e.rosesPerRound=[5,4,3,2,1],e.state={gameStage:0,roundNum:0,activeRatNames:[]},e}return Object(h.a)(a,[{key:"restartGame",value:function(){this.setState({gameStage:0,roundNum:0,activeRatNames:[]})}},{key:"getRatByName",value:function(e){for(var t=0;t<w.length;t++)if(w[t].name===e)return w[t]}},{key:"render",value:function(){var e=this;return 0===this.state.gameStage?Object(o.jsx)(m,{onClick:function(){e.setState({gameStage:1})}}):1===this.state.gameStage?Object(o.jsx)(d,{rats:w,numRatsInGame:this.numRatsInGame,advanceState:function(){return e.setState({gameStage:2})},setActiveRats:function(t){e.setState({activeRatNames:t})}}):2===this.state.gameStage?Object(o.jsx)(g,{activeRatNames:this.state.activeRatNames,getRatByName:this.getRatByName,round:this.state.roundNum,goToRoseCeremony:function(){return e.setState({gameStage:3})}}):3===this.state.gameStage?Object(o.jsx)(f,{activeRatNames:this.state.activeRatNames,getRatByName:this.getRatByName,numRoses:this.rosesPerRound[this.state.roundNum],setActiveRats:function(t){e.setState({activeRatNames:t})},advanceState:function(){var t=e.state.roundNum+1;t===e.numRounds?e.setState({gameStage:4}):e.setState({gameStage:2,roundNum:t})}}):4===this.state.gameStage?Object(o.jsx)(v,{finalRat:this.getRatByName(this.state.activeRatNames[0]),restartGame:this.restartGame.bind(this)}):void 0}}]),a}(n.a.Component);r.a.render(Object(o.jsx)(n.a.StrictMode,{children:Object(o.jsx)(b,{})}),document.getElementById("root"))},6:function(e){e.exports=JSON.parse('[{"name":"Heighness Laure","dialogue":["Money, money, money. It\u2019s all anyone sees when they look at me. Mostly because I\u2019m usually holding money.","Dear I can\u2019t say that I recall you mentioning it, but how did you say you\u2019d scored on the SATs? I got a 1570, which is quite good, if you didn\u2019t know.","Darling, I have to tell you, I just can\u2019t stand it when my date takes out their wallet to pay after a night out. You really think I took you to Le Mergereuse Restaurante Martine expecting you to spend $17,500? I know the chef, dear, they\u2019re an old friend. Plus, the money is nothing to me. Really.","My lashes? I simply dip them in a bowl of antique charcoal each morning to get the color, and then twist them into a tip with olive oil to get the density. An old trick in my social circles.","Im only used to looking through people, but when I look at you I feel like I\u2019m looking right at you. It makes me feel like maybe\u2026 you wouldn\u2019t use me? Not like everyone else does\u2026","I\u2019ve spent my whole life focused on building an empire, and I\u2019d give it all away for you. My fortune, my place on the throne, my fancy diamonds\u2026 I just want you. I love you, and I want to be with you forever."],"couchPicFilename":"","animePicFilename":""},{"name":"Migg Mouse","dialogue":["Usually I spend all my time working out my lats, glutes, and delts. But taking a break from my workout is all worth it if I get to meet you.","I\u2019d love to get to know you better. My parents always taught me to treat others with respect, and listen more than you talk. Look at me, going on and on about my family.","I was doing some crunches earlier when you popped into my head. I couldn\u2019t stop thinking about you. It was so inspiring I actually beat my personal record. This might sound silly but... I\u2019ve, I\u2019ve never felt like this before.","Listen, I know I\u2019m not as flashy as some of these other rats. But I can give you what you need: a good life, with a caring partner who will honor and respect you every day. I\u2019m a family rat to my core.","I can\u2019t get you out of my head. I wake up every morning thinking of you. Usually I wake up thinking about protein powder. What\u2019s happening to me? I want to wake up next to you every morning, forever\u2026 Have you heard of cross fit?","I\u2019m not so good with words. But you need to know something: I truly love you with every muscle, tendon, and fiber in my body. I really do, and I will go on loving you forever. I want to start a family together, I want you to meet my mom. I\u2019m all in."],"couchPicFilename":"","animePicFilename":""},{"name":"L\'Artiste","dialogue":["Bonjour, je m\u2019appelle L\u2019Artiste \u2013 oh, I\u2019m sorry, I just got back from France and always forget to switch languages \u2013 is my accent le noticeable?","I brought you some cheese - the best kind. This is l\u2019American fromage that i have thee stolen from a two-story Italian supermarchet and then fermented in French sewers for six months. Do you amore it? Let us eat it together oh darlling\u2026","You are le more beautiful then the ten thousand million sunsets of th french revolution oh i would paint you with a feeble swipe of my brush but your essence is uncapturable","You are the dejavu of my future. I would regardez your lovely visage and if I could i\u2019d never blink so I could gaze at you always, then I would - a picture is worth a thousand million words but to behold you is worth ten billion thousand million","I swoon to just think of beholding your presence. Oh! Woe is me to be in the je ne sais quoi of life, to know that i walk this earth with one such as you ah surely the gods smile down.","I cherish the width of your eyes, the courage of your heart, the love entre your soul. Mon cherie, I love you et j\u2019adore you foreverre. Let us never be apart again even for a single second or even a millisecond."],"couchPicFilename":"","animePicFilename":""},{"name":"Bora XIV","dialogue":["Oh whats this lil yellow ribbon for? Never you mind ;)","I\u2019ve been told these violet eyes of mine are more purple then all the lavender in the world and I certainly smell better too  owo","When I see you I see a all the stars in the world.. a constellation of thought and love and joy","Ah to be free and to dance. If I could be anyone I\u2019d be the ocean. Everywhere at once and no where, dancing freely with the waves as the moon pulls me to and fro and the seagulls pec at my ears. Ahhh nothing quite as lovely as the sandy salty scent of seabreeze as the sun sets.","Imagine if we were planes in the sky! Like stars, so large yet far away yet bright beautiful, the muse of poets, they\u2019d all write about us","Let\u2019s spend the rest of our lives together,.. On the moon! What a lovely idea, i bet everyone would look like ants from way up there. And we can get a cow and grow our own cheese, till the soil for some lovely berries"],"couchPicFilename":"","animePicFilename":""},{"name":"Dr. Plagueus, PhD","dialogue":["Hullo, I\u2019m Dr. Plageus, PhD. I studied rat history in the basements of the University of Bingham. In my spare time, I consult on human films that feature rats, such as Ratatouille and the Secret of Nimh. I also like to read about major historical rat events\u2026 like those in the Victorian era. But I\u2019ll get to that later.","You wanted to hear more about my interests? Well, I don\u2019t usually tell people this unless they\u2019re my close friends, but my great-great-uncle actually single-handedly brought the plague from France to Italy. That\u2019s why I love learning about the Plague so much. I\u2019ve actually been putting together a documentary about it that I could show you later.","I had such a good talk with you earlier that I wanted to share more about my hobby - this is a costume that my great-great-aunt sewed for her son as a Halloween costume. I\u2019m kind of embarrassed\u2026 I haven\u2019t shown anyone this in a long time.","So there\u2019s one more thing I wanted to reveal to you. Ever since I was a mere pup in a litter of rats, I\u2019ve been so uncannily buff. At first I was just like all the other rats, but one day I ate a bit of candy on the street and my body changed all at once! My siblings would make fun of me for my new appearance, and I was so ashamed. I learned that humans wear clothes, so I started wearing them too to hide myself. But I think I\u2019m ready to show you all of myself.","I\u2019m so glad you kept me around\u2026 I thought for sure I had scared you away. I feel like you really get me. I usually feel so lonely in my day to day life as a consultant for movies. I never had a connection with someone like this before.","You could read all the books in the world about love, the poems, and the stories, but nothing can compare to the true feeling. It\u2019s not only a chemical reaction in my brain, it\u2019s much more than that, words cannot describe. My love, I am going to dedicate my black plague documentary to you!"],"couchPicFilename":"","animePicFilename":""},{"name":"ARealRat","dialogue":["I\u2019m a business conglomerate at the Dow Jones\u2026 I personally oversee the S&P500, Roth IRA and NASDAQ. I teach a class about Pyramid Schemes at college.","You wanted to learn more about my work? Well, I know 401K personally, I have their number on speed dial. They trust me more than they trust Mister $TSLA to get that money in the bank.","Hey, on a more personal note, I\u2019ve been thinking a lot about a moment in my childhood when I lost my tail\u2026 it got caught in a trap and it was torn right off. My mom took care of me and it grew right back. That\u2019s what I\u2019m looking for in a partner\u2026 someone who will be there for me when I need them.","Telling you my personal story last time felt really good. I want you to really know me. I\u2019ve never felt right in my own skin. Ever since I was a little rat I\u2019ve felt different from everyone else. I don\u2019t know. I don\u2019t know what I\u2019m doing here. You\u2019re so attractive and I\u2019m just\u2026 me. And the other rats have so much to offer. It feels like I\u2019m in high school again.","I think it\u2019s finally time for me to show you the true me\u2026 I have a horrible secret to tell you. Promise you won\u2019t leave me after you find out? Ugh.. I can\u2019t do this. I\u2019m too afraid...","Now I\u2019m finally ready. We\u2019re actually three geckos in a costume. We\u2019re so sorry we lied to you all this time, but we were afraid you would reject us. We\u2019re also sorry that we lied about our job, but we just wanted to impress you so much. But when we saw your picture, we just knew we had to meet you. We fell in love instantly. And after getting to know you more, we\u2019ve fallen even more in love. We love you so much."],"couchPicFilename":"","animePicFilename":""},{"name":"Bear","dialogue":["Oh, wow, I can, uh, barely see you. But I really like how the top of your head looks.","Do you like music too?? You should meet the bandmates at some point.","I used to be a lab rat, they were experimenting on me with growth serum\u2026 until one day I had a growth spurt and got bigger than my cage so they kinda just let me go wherever I wanted","Sometimes I like to go to the autoshop and watch them work on cars - once I drove there but my car was to small and they almost stepped on it, thought it was a Hot Wheels, its not tho, it runs on renewable energy","Picked this up for you!! Its a sandwich from my aunts bakery down near the Promenade. Cheese and more cheese, with a bit of tomato and a single leaf special just for you","I wrote a song for you. *hits drums*"]}]')},7:function(e){e.exports=JSON.parse('["Wow you\'re so different","Oh wow","Wow!","Okay","That\'s nice","Interesting","Very interesting","Cool","I\'m so sorry to hear that","You\'ve been through so much","I can\'t imagine what that\'s like","Ok","Neat","Thank you for sharing","I appreciate you being vulnerable","I appreciate you sharing that","I appreciate your perspective","I value you","I\'m so glad you\'re here","Uh...","What?","Oh I didn\'t realize you were still here","Is that all?","Don\'t look at me like that","Yuck","Umm I think my mom is calling let me go check","Care for some juice?"]')}},[[17,1,2]]]);
//# sourceMappingURL=main.c6a84623.chunk.js.map