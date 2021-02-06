(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{15:function(e,t,o){},16:function(e,t,o){},17:function(e,t,o){"use strict";o.r(t);var a=o(0),n=o(1),s=o.n(n),i=o(9),r=o.n(i),h=(o(15),o(2)),l=o(3),u=o(5),d=o(4),m=(o(16),function(e){Object(u.a)(o,e);var t=Object(d.a)(o);function o(){return Object(h.a)(this,o),t.call(this)}return Object(l.a)(o,[{key:"render",value:function(){return Object(a.jsxs)("div",{id:"introScreen",children:[Object(a.jsx)("button",{onClick:this.props.onClick,children:"Embark"}),Object(a.jsx)("div",{id:"hideme"})]})}}]),o}(s.a.Component)),c=function(e){Object(u.a)(o,e);var t=Object(d.a)(o);function o(){var e;return Object(h.a)(this,o),(e=t.call(this)).onClickSelectRats=function(){e.props.setActiveRats(e.state.selectedRats),e.props.advanceState()},e.state={selectedRats:[],selectRatsButton:""},e}return Object(l.a)(o,[{key:"selectRat",value:function(e,t){var o=document.getElementById(t);if(-1!=this.state.selectedRats.indexOf(e)){var n=this.state.selectedRats.indexOf(e),s=this.state.selectedRats;return s.splice(n,1),this.setState({selectedRats:s}),o.classList.remove("selectedRat"),void this.setState({selectRatsButton:""})}if(this.state.selectedRats.length!==this.props.numRatsInGame){if(this.state.selectedRats.push(e),o.classList.add("selectedRat"),this.state.selectedRats.length===this.props.numRatsInGame){var i=Object(a.jsx)("button",{onClick:this.onClickSelectRats,children:"Continue"});this.setState({selectRatsButton:i})}else this.setState({selectRatsButton:""});this.setState({})}}},{key:"render",value:function(){for(var e=this,t=[],o=function(o){var n="/ratchelor/img/Characters/".concat(e.props.rats[o].filename,".png");t.push(Object(a.jsx)("div",{id:"ratContainer",children:Object(a.jsxs)("div",{id:"rat".concat(o),className:"ratListItem",onClick:function(){e.selectRat(e.props.rats[o].name,"rat".concat(o))},children:[Object(a.jsx)("div",{className:"ratName",children:"".concat(e.props.rats[o].name)}),Object(a.jsx)("img",{className:"ratPic",src:n})]})},o))},n=0;n<this.props.rats.length;n++)o(n);return Object(a.jsxs)("div",{id:"ratSelectScreen",children:[Object(a.jsxs)("div",{id:"chooseText",children:["Choose your ","".concat(this.props.numRatsInGame)," lovely contestants:"]}),Object(a.jsx)("div",{id:"ratListContainer",children:t}),this.state.selectRatsButton]})}}]),o}(s.a.Component),y=o(7),g=function(e){Object(u.a)(o,e);var t=Object(d.a)(o);function o(e){var a;return Object(h.a)(this,o),(a=t.call(this,e)).ratNames=e.activeRatNames.sort((function(e,t){return.5-Math.random()})),a.activeRats=a.ratNames.map((function(e){return a.props.getRatByName(e)})),a.responses=y,a.charSpeed=36,a.state={ratIndex:0,charsRevealed:0,responses:[]},a}return Object(l.a)(o,[{key:"componentDidMount",value:function(){this.startTextMoving(),this.getRandomResponses()}},{key:"startTextMoving",value:function(){var e=this;this.setState({charsRevealed:0}),this.interval=window.setInterval((function(){var t=e.state.charsRevealed+1;t>e.activeRats[e.state.ratIndex].dialogue[e.props.round].length||e.setState({charsRevealed:t})}),this.charSpeed)}},{key:"submitResponse",value:function(){window.clearInterval(this.interval),this.startTextMoving(),this.getRandomResponses();var e=this.state.ratIndex+1;e===this.ratNames.length?this.props.goToRoseCeremony():this.setState({ratIndex:e})}},{key:"getRandomResponses",value:function(){y.sort((function(){return.5-Math.random()}));for(var e=[],t=0;t<3;t++){var o=y[t],n=Object(a.jsx)("button",{onClick:this.submitResponse.bind(this),children:o},t);e.push(n)}this.setState({responses:e})}},{key:"render",value:function(){var e=this.activeRats[this.state.ratIndex].dialogue[this.props.round].substring(0,this.state.charsRevealed);return 0===e.length&&(e="."),Object(a.jsxs)("div",{id:"talkingToRatsScreen",children:[Object(a.jsx)("img",{id:"playerRat",src:"/ratchelor/img/Couch/you.png"}),Object(a.jsx)("img",{id:"talkingRat",src:"/ratchelor/img/Couch/".concat(this.activeRats[this.state.ratIndex].filename,".png")}),Object(a.jsxs)("div",{id:"dialogueContainer",children:[Object(a.jsx)("div",{id:"ratName",children:this.activeRats[this.state.ratIndex].name}),Object(a.jsx)("div",{id:"ratDialogue",children:e})]}),Object(a.jsx)("div",{id:"responses",children:this.state.responses})]})}}]),o}(s.a.Component),w=function(e){Object(u.a)(o,e);var t=Object(d.a)(o);function o(e){var a;return Object(h.a)(this,o),(a=t.call(this,e)).ratNames=e.activeRatNames.sort((function(e,t){return.5-Math.random()})),a.activeRats=a.ratNames.map((function(e){return a.props.getRatByName(e)})),a.numRoses=a.props.numRoses,a.state={selectedRats:[],giveRosesButton:""},a}return Object(l.a)(o,[{key:"selectRat",value:function(e,t){var o=document.getElementById(t);if(-1!=this.state.selectedRats.indexOf(e)){var n=this.state.selectedRats.indexOf(e),s=this.state.selectedRats;return s.splice(n,1),this.setState({selectedRats:s}),o.classList.remove("selectedRat"),void this.setState({giveRosesButton:""})}if(this.state.selectedRats.length!==this.numRoses){if(this.state.selectedRats.push(e),o.classList.add("selectedRat"),this.state.selectedRats.length===this.numRoses){var i=Object(a.jsx)("button",{onClick:this.endRoseCeremony.bind(this),children:"Choose Contestants"});this.setState({giveRosesButton:i})}else this.setState({giveRosesButton:""});this.setState({})}}},{key:"endRoseCeremony",value:function(){this.props.setActiveRats(this.state.selectedRats),this.props.advanceState()}},{key:"render",value:function(){for(var e=this,t=[],o=function(o){var n="/ratchelor/img/Characters/".concat(e.activeRats[o].filename,".png");t.push(Object(a.jsxs)("div",{id:"rat".concat(o),className:"ratList",onClick:function(){e.selectRat(e.activeRats[o].name,"rat".concat(o))},children:[Object(a.jsx)("img",{className:"ratPic",src:n}),Object(a.jsx)("img",{className:"rosePic",src:"/ratchelor/img/temprose.png"})]},o))},n=0;n<this.activeRats.length;n++)o(n);for(var s=[],i=0;i<this.props.numRoses-this.state.selectedRats.length;i++)s.push(Object(a.jsx)("img",{className:"roseIcon",src:"/ratchelor/img/temprose.png"}));return Object(a.jsxs)("div",{id:"roseCeremonyScreen",children:[Object(a.jsx)("div",{id:"roseContainer",children:s}),Object(a.jsxs)("div",{id:"ratListContainer",children:[" ",t]}),Object(a.jsxs)("div",{id:"giveRosesButton",children:[" ",this.state.giveRosesButton]})]})}}]),o}(s.a.Component),f=function(e){Object(u.a)(o,e);var t=Object(d.a)(o);function o(e){return Object(h.a)(this,o),t.call(this,e)}return Object(l.a)(o,[{key:"render",value:function(){return Object(a.jsxs)("div",{id:"animeEndingScreen",children:["You chose ","".concat(this.props.finalRat.name),":",Object(a.jsx)("br",{}),this.props.finalRat.dialogue[this.props.finalRat.dialogue.length-1],Object(a.jsx)("button",{onClick:this.props.restartGame,children:"Restart Game"})]})}}]),o}(s.a.Component),I=o(6),b=function(e){Object(u.a)(o,e);var t=Object(d.a)(o);function o(){var e;return Object(h.a)(this,o),(e=t.call(this)).numRatsInGame=8,e.numRounds=5,e.rosesPerRound=[6,4,3,2,1],e.state={gameStage:0,roundNum:0,activeRatNames:[]},e}return Object(l.a)(o,[{key:"restartGame",value:function(){this.setState({gameStage:0,roundNum:0,activeRatNames:[]})}},{key:"getRatByName",value:function(e){for(var t=0;t<I.length;t++)if(I[t].name===e)return I[t]}},{key:"render",value:function(){var e=this;return 0===this.state.gameStage?Object(a.jsx)(m,{onClick:function(){e.setState({gameStage:1})}}):1===this.state.gameStage?Object(a.jsx)(c,{rats:I,numRatsInGame:this.numRatsInGame,advanceState:function(){return e.setState({gameStage:2})},setActiveRats:function(t){e.setState({activeRatNames:t})}}):2===this.state.gameStage?Object(a.jsx)(g,{activeRatNames:this.state.activeRatNames,getRatByName:this.getRatByName,round:this.state.roundNum,goToRoseCeremony:function(){return e.setState({gameStage:3})}}):3===this.state.gameStage?Object(a.jsx)(w,{activeRatNames:this.state.activeRatNames,getRatByName:this.getRatByName,numRoses:this.rosesPerRound[this.state.roundNum],setActiveRats:function(t){e.setState({activeRatNames:t})},advanceState:function(){var t=e.state.roundNum+1;t===e.numRounds?e.setState({gameStage:4}):e.setState({gameStage:2,roundNum:t})}}):4===this.state.gameStage?Object(a.jsx)(f,{finalRat:this.getRatByName(this.state.activeRatNames[0]),restartGame:this.restartGame.bind(this)}):void 0}}]),o}(s.a.Component);r.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(b,{})}),document.getElementById("root"))},6:function(e){e.exports=JSON.parse('[{"name":"Heighness Laure","dialogue":["Money, money, money. It\'s all anyone sees when they look at me. Mostly because I\'m usually holding money.","Dear I can\'t say that I recall you mentioning it, but how did you say you\'d scored on the SATs? I got a 1570, which is quite good, if you didn\'t know.","Darling, I have to tell you, I just can\'t stand it when my date takes out their wallet to pay after a night out. You really think I took you to Le Mergereuse Restaurante Martine expecting you to spend $17,500? I know the chef, dear, they\'re an old friend. Plus, the money is nothing to me. Really.","My lashes? I simply dip them in a bowl of antique charcoal each morning to get the color, and then twist them into a tip with olive oil to get the density. An old trick in my social circles.","Im only used to looking through people, but when I look at you I feel like I\'m looking right at you. It makes me feel like maybe\u2026 you wouldn\'t use me? Not like everyone else does\u2026","I\'ve spent my whole life focused on building an empire, and I\'d give it all away for you. My fortune, my place on the throne, my fancy diamonds\u2026 I just want you. I love you, and I want to be with you forever."],"filename":"heighnesslaure"},{"name":"Migg Mouse","dialogue":["Usually I spend all my time working out my lats, glutes, and delts. But taking a break from my workout is all worth it if I get to meet you.","I\'d love to get to know you better. My parents always taught me to treat others with respect, and listen more than you talk. Look at me, going on and on about my family.","I was doing some crunches earlier when you popped into my head. I couldn\'t stop thinking about you. It was so inspiring I actually beat my personal record. This might sound silly but... I\'ve, I\'ve never felt like this before.","Listen, I know I\'m not as flashy as some of these other rats. But I can give you what you need: a good life, with a caring partner who will honor and respect you every day. I\'m a family rat to my core.","I can\'t get you out of my head. I wake up every morning thinking of you. Usually I wake up thinking about protein powder. What\'s happening to me? I want to wake up next to you every morning, forever\u2026 Have you heard of cross fit?","I\'m not so good with words. But you need to know something: I truly love you with every muscle, tendon, and fiber in my body. I really do, and I will go on loving you forever. I want to start a family together, I want you to meet my mom. I\'m all in."],"filename":"miggmouse"},{"name":"L\'Artiste","dialogue":["Bonjour, je m\'appelle L\'Artiste \u2013 oh, I\'m sorry, I just got back from France and always forget to switch languages \u2013 is my accent le noticeable?","I brought you some cheese - the best kind. This is l\'American fromage that i have thee stolen from a two-story Italian supermarchet and then fermented in French sewers for six months. Do you amore it? Let us eat it together oh darlling\u2026","You are le more beautiful then the ten thousand million sunsets of th french revolution oh i would paint you with a feeble swipe of my brush but your essence is uncapturable","You are the dejavu of my future. I would regardez your lovely visage and if I could i\'d never blink so I could gaze at you always, then I would - a picture is worth a thousand million words but to behold you is worth ten billion thousand million","I swoon to just think of beholding your presence. Oh! Woe is me to be in the je ne sais quoi of life, to know that i walk this earth with one such as you ah surely the gods smile down.","I cherish the width of your eyes, the courage of your heart, the love entre your soul. Mon cherie, I love you et j\'adore you foreverre. Let us never be apart again even for a single second or even a millisecond."],"filename":"lartiste"},{"name":"Bora XIV","dialogue":["Oh whats this lil yellow ribbon for? Never you mind ;)","I\'ve been told these violet eyes of mine are more purple then all the lavender in the world and I certainly smell better too  owo","When I see you I see a all the stars in the world.. a constellation of thought and love and joy","Ah to be free and to dance. If I could be anyone I\'d be the ocean. Everywhere at once and no where, dancing freely with the waves as the moon pulls me to and fro and the seagulls peck at my ears. Ahhh nothing quite as lovely as the sandy salty scent of seabreeze as the sun sets.","Imagine if we were planes in the sky! Like stars, so large yet far away yet bright beautiful, the muse of poets, they\'d all write about us","Let\'s spend the rest of our lives together,.. On the moon! What a lovely idea, i bet everyone would look like ants from way up there. And we can get a cow and grow our own cheese, till the soil for some lovely berries"],"filename":"boraxiv"},{"name":"Dr. Plagueus, PhD","dialogue":["Hullo, I\'m Dr. Plageus, PhD. I studied rat history in the basements of the University of Bingham. In my spare time, I consult on human films that feature rats, such as Ratatouille and the Secret of Nimh. I also like to read about major historical rat events\u2026 like those in the Victorian era. But I\'ll get to that later.","You wanted to hear more about my interests? Well, I don\'t usually tell people this unless they\'re my close friends, but my great-great-uncle actually single-handedly brought the plague from France to Italy. That\'s why I love learning about the Plague so much. I\'ve actually been putting together a documentary about it that I could show you later.","I had such a good talk with you earlier that I wanted to share more about my hobby - this is a costume that my great-great-aunt sewed for her son as a Halloween costume. I\'m kind of embarrassed\u2026 I haven\'t shown anyone this in a long time.","So there\'s one more thing I wanted to reveal to you. Ever since I was a mere pup in a litter of rats, I\'ve been so uncannily buff. At first I was just like all the other rats, but one day I ate a bit of candy on the street and my body changed all at once! My siblings would make fun of me for my new appearance, and I was so ashamed. I learned that humans wear clothes, so I started wearing them too to hide myself. But I think I\'m ready to show you all of myself.","I\'m so glad you kept me around\u2026 I thought for sure I had scared you away. I feel like you really get me. I usually feel so lonely in my day to day life as a consultant for movies. I never had a connection with someone like this before.","You could read all the books in the world about love, the poems, and the stories, but nothing can compare to the true feeling. It\'s not only a chemical reaction in my brain, it\'s much more than that, words cannot describe. My love, I am going to dedicate my black plague documentary to you!"],"filename":"dr"},{"name":"ARealRat","dialogue":["I\'m a business conglomerate at the Dow Jones\u2026 I personally oversee the S&P500, Roth IRA and NASDAQ. I teach a class about Pyramid Schemes at college.","You wanted to learn more about my work? Well, I know 401K personally, I have their number on speed dial. They trust me more than they trust Mister $TSLA to get that money in the bank.","Hey, on a more personal note, I\'ve been thinking a lot about a moment in my childhood when I lost my tail\u2026 it got caught in a trap and it was torn right off. My mom took care of me and it grew right back. That\'s what I\'m looking for in a partner\u2026 someone who will be there for me when I need them.","Telling you my personal story last time felt really good. I want you to really know me. I\'ve never felt right in my own skin. Ever since I was a little rat I\'ve felt different from everyone else. I don\'t know. I don\'t know what I\'m doing here. You\'re so attractive and I\'m just\u2026 me. And the other rats have so much to offer. It feels like I\'m in high school again.","I think it\'s finally time for me to show you the true me\u2026 I have a horrible secret to tell you. Promise you won\'t leave me after you find out? Ugh.. I can\'t do this. I\'m too afraid...","Now I\'m finally ready. We\'re actually three geckos in a costume. We\'re so sorry we lied to you all this time, but we were afraid you would reject us. We\'re also sorry that we lied about our job, but we just wanted to impress you so much. But when we saw your picture, we just knew we had to meet you. We fell in love instantly. And after getting to know you more, we\'ve fallen even more in love. We love you so much."],"filename":"arealrat"},{"name":"Reggie-231","dialogue":["Imagine there\'s no heaven, and no religion too, nothing to live or die for, and above us only sky. Grew my first begonias last year and they changed my life","My ma had me and the rest of the litter in some sweet old ladies kitchen cupboard but turns out her nephew wasn\'t so sweet. Put out a lot of no kill traps but then he sent us to the lab for a paycheck that we didn\'t even get to cash out. I was in there for 6 months - thats 84.23 percent of my life.","At around month 5 in the lab I met Franceride-449, medium size rat, normal build, robot arm and I said woah there where\'d you get that?","Turns out Franc 44 got a paper cut while filing some documents and he didnt bleed so he looked at the cut and turned out a whole roboleg was hiding in there. He did some digging and it turns out he wasn\'t the only one. Ended up being my dad was a robot mouse and my mom a normal house mouse - they fell in love and had me.","Dad was an experiment and had no idea he wasn\'t \u2018real\' (I put that in parentheses cause hes real to me). Anyways 44 helped me get out of there after he realized the truth but not before he and J0J098 figured out how to disable the tracking software running in our wires. Rewrote it with some bitcoin miner so we make a small sum as long as we dont skip out on our sleep. Its not a lot but its enough to live off of","Listen, I didn\'t know this cold heart could love the way it does when I see you. If you\'d told me back in the lab that I\'d meet a rat like you, well, I wouldn\'t have believed ya. I\'ll make you happy every day from now on, that\'s my promise."],"filename":"reggie231"},{"name":"Vim","dialogue":["Being a single parent isn\'t easy. I\'ve been raising these little ones myself since day one.","It\'s time you met my children: Reggie-997, Evangeline, Esquire Jr., Sharpie, and Trashcan. They already love you.","Reggie-977 and Esquire Jr. are twins, but you wouldn\'t know it because Esquire Jr. is way uglier","Evangeline\'s piano recital is coming up, and sharpie is jealous because they just started learning to play the Bass while Evangeline is already getting interviews at Julliard","Trashcan is my little angel, if anything ever happened to them I would simply scream for years and cry forever. They have never done a single wrong they are incapable.","I thought I already had enough family. Me and my kids, that\'s the only real family I\'ve ever had. But then I met you and you changed everything. We can\'t wait to welcome you into our life forever."],"filename":"vim"},{"name":"Bear","dialogue":["Oh, wow, I can, uh, barely see you. But I really like how the top of your head looks.","Do you like music too?? You should meet the bandmates at some point.","I used to be a lab rat, they were experimenting on me with growth serum\u2026 until one day I had a growth spurt and got bigger than my cage so they kinda just let me go wherever I wanted","Sometimes I like to go to the autoshop and watch them work on cars - once I drove there but my car was to small and they almost stepped on it, thought it was a Hot Wheels, its not tho, it runs on renewable energy","Picked this up for you!! Its a sandwich from my aunts bakery down near the Promenade. Cheese and more cheese, with a bit of tomato and a single leaf special just for you","When the doctors only told me I had 3 days to live due to my above average size, well, I figured I didn\'t have much to live for. But now, 3 years later, I\'m glad I proved them all wrong because that experience led me to you. You\'re my forever."],"filename":"bear"},{"name":"EggSalad","dialogue":["Um, hi\u2026 sorry, I\'m a little nervous, I\'ve never done anything like this before! It\'s just\u2026 I saw your profile and thought you were so cute\u2026 that I had to come compete. I hope that\'s not too embarrassing!","Hi again! I really enjoyed talking to you last time and I was thinking\u2026 I was hoping\u2026 maybe we could keep talking? Maybe that sounds too obvious, I don\'t know. I just really love \u2013 I mean like! \u2013 the sound of your voice\u2026 ","So last month, I was volunteering with this local youth organization, and one of the kids taught me how to crochet! And ever since I haven\'t been able to stop crocheting. So, I\'m working on crocheting a special hat for you, I hope you don\'t mind!","Honestly, as much as I enjoy being here on The Ratchelor, I can\'t wait to get back home so I can keep teaching my baking class at the local youth center! The kids are so sweet, next up I\'m teaching them all to bake cheesecake. I hope you come with me\u2026 I could bake you a cheesecake, the kids would love you...","You\'re so funny! Honestly, you make me feel like I haven\'t felt before. There\'s something about you that just makes me feel recharged, at peace. Maybe even... in love.","I hope this doesn\'t sound too cheesy but.. I wish I was a cat so I could spend all 9 of my lives with you. I love you. I want to be with you forever. I want to bake you endless cakes and pies forever. And I don\'t care who knows. I\'ll shout it from the rooftops! I love you!"],"filename":"eggsalad"},{"name":"Emacs","dialogue":["Uh, hey. Why are you talking to me? I\'m Emacs, if it matters. I like to do my own thing.","Listen sweetie, I don\'t like to play by the rules, so if you want to ride the Emacs train, you better be ready for some freaky deaky stuff.","You wanna know something? I didn\'t get on the top 10 most wanted list of Worldwide Exterminators by being a good little rat and doing what I was told. You\'ve gotta be willing to be bad, and maybe even break a few hearts along the way. Should I break yours?","I feel like when people meet me they think I\'m bad to my core. But, everything I do, I do for justice. It\'s so frustrating. I... I\'ll explain when you\'re ready. I should go.","Humans every day are out there exploiting others with their money and power\u2026 I like to sneak into the evil one\'s houses and give them a bit of a scare. Been dodging extermination on Wall Street since \u201809. Now you know my secret.","Hey. When I first met you, I thought you were kind of annoying. But now, I see you for who you truly are, and I see that you see me. I think we\'d make a really notorious duo. You get me like no one else ever has. I love you, I\'m not afraid to say it. I want to be together forever."],"filename":"emacs"},{"name":"Jagadoo","dialogue":["Hey cool cat, you ever see someone who can do two magic tricks at once?","One time i was running with the gang back in cirque de soleil and as soon as that elephant got on stage and some acrobat was doing gymnastics on its back, well all eyes where on him -  i ran to the admissions desk and booked it with the ticket stubs. Been living off that $$ evver sense, here do you want some? (hands you a dollar)","I just love the wet dog smell, god, if I could get a tattoo, but of a scent, kinda like cologne but forever, let me tell you id do it in a heartbeat.","Hey lets go down to my old haunts and see if we can tie everyones shoelaces together without them noticing","You almost make me want to stop my dastardly way and live a boring life sitting around the house just like.. Eating sandwiches and watching tv with you\u2026 i dont know","Listen sugar, I think you\'re sweet. Wha do you say we find ourselves an alcove out west and spend the rest of our lives bonnie and clyde style"],"filename":"jagadoo"},{"name":"Slim Jim","dialogue":["Im Looking Good Today","WOw the sparkle in your eyes are almost as brilliant as the sparkle in mine. Maybe if we stare into eachothers eyes for long enough they\'ll reflect into a supernova","I picked you this rose. I grew it myself in my single rose garden and pruned its leaves and dyed its pedals the perfect luxurious red so I could give it to you cause we both deserve nothing less than perfection","Ah together we could truly rule the galaxy. Your brain, and my good looks, and your good look, ah truly a pair to behold.","Run away with me, who cares about this silly TV show, I know you are perfect, and well, of course I am, so why should we wait? Why spend a single moment apart when we can elope and start our forever right this second.","I knew it. Destiny had us in store for each other and with good reason *sloppy wet kiss*"],"filename":"slimjim"},{"name":"Hiberdean","dialogue":["Mm\u2026 meep meep-o ee","Mippty eee mop quack","Pipo slop beep meep","Meee me meep eee meep","Mip meeeep eee eeep eeee eeee aaAEAEE bip moop mepo pippity"],"filename":"hiberdean"},{"name":"Hottie Thespule","dialogue":["Get oUT of my way I am nOt here to make friends. Oh! Its you, sorry I thought you where one of the.. Actually no I stand by my words I am not here to make friends please get out of my way.","If you want my respect you need to earn it. My whole life Ive had to make do by myself and work for what Ive got and everytime Ive needed help people let me down.","I feel like I tell you so much and all you ever do is reply to me but I dont know a single thing about you. What even is your name. What makes your heart beat in the morning. Why do you think you deserve me or anyone else on this show. Sounds to me like you just got lucky and now everyones swooning on you but your just like the rest of them.","I saw you talking to every single rat in this rat cage and you keep making eyes at me? If I asked you for your last stinky cheese bouquet would you give it to me? Or throw it at any one of those rats. Mind you Im not asking for anything from you but you need to think about this decision or maybe Ill just walk off myself.","Look Im sorry if I\'ve been abrasive. Every rose has their thorn. I think your sweet but that doesn\'t always mean anything. Its a rat eat rat world out there and I dont like biting but I don\'t want to get bit.","I have to say, despite starting off on the wrong foot, you are deeply okay. I dont dislike you one bit. In fact, i think maybe, I can try this love thing out one last time. I love you. WIll you spend the rest of your life with me?"],"filename":"hottiethespule"},{"name":"Egralo","dialogue":["Oh my goodness this is so embarrassing. Please put something on this is indecent. I used to be just like the rest of you till I was sitting in the garden thinking. I ate an apple from the tree and then it hit me. Why do people wear clothes, yet we dont? How could I have lived like this for so long. I brought an extra pair of overalls if you want to borrow them.","Anyways yeah so after my realization I taught myself to sew. Found a toy store and they have some pretty cool tiny clothes. Clothes are super important to me. So many styles! Fabrics to feel, things to try on. Lovely. Every outfit an adventure.","I brought you this!! . Its a pair of gloves for my love (you!) Sewed it from a swatch of fabric I got from Dolly Parton\'s mansion. It will grant you amazing singing abilities when you wear them.","Oh I sewed us matching overcoats!! Cant wait for the newest winter storm to come in and blow us away. You blow me away every day with your wonderful heart and welcoming soul.","I think fabric is a great metaphor for love. A lot of small strand woven together into something that lasts for ever. When I think of what I want out of a relationship, I always think of my favorite sweater - something worn in that fits me perfectly and is always comfortable.","Lets weave ourselves an amazing life together. I love you so much I dont even know where to go with this metaphor. Your the fabric of my life and the love of my fabric\u2026 the love of my life. I love you! I love you."],"filename":"egralo"},{"name":"Manelo","dialogue":["I mean I think the world is about what you give and what you get. If a tree falls in the middle of the forest and no one hears it, does it even matter? Matters if youre a bird and that tree was your house but if you\'ve never been to a forest then no doesnt matter.","Never been much of an outgoing rat, prefer to keep to myself. Not one for the hustle and bustle of downtown life. Ive never loved the city but I do love love.","Hey.. you know I\'m a simple rat with simple desires. I usually dont open up to people, its just not my THING okay. But when I look at you i- oh nevermind. Yeah I dont know, if this doesnt pan out I think Ill just go back to my cottage and put all my energy into finishing my coin collection. I got pretty into it a few month ago but took a break to find myself. I hear the ebay listings are pretty good this time of year tho\u2026","Honestly I\'m surprised I made it this far- I mean uhh Im not surprised, uhh I mean- *sigh* I made a post on ratddit.com/r/relationships asking for advice on what I should do... and they all say I gotta be more confident and outright with my feelings. So here it goes: I built myself a hut out in the Prarie up north. Like to keep to myself, but I wish I had a someone to share it with, hope that someone is you.","I mean, I dont like to talk about it that much but yeah I am a bit omniscient. But, like, look, I mean I think definitely actions count for more than foresight and the future is a sequence of actions and reactions, so theres a lot of possible ways the present could go and I could have guessed them anyways so","Wow\u2026 hey\u2026. Sorry I cant stop staring at you\u2026. Wow\u2026 how\u2026 this may take me a bit to comprehend\u2026 wow .. just look\u2026. Your \u2026 eyes .. you \u2026 mee?? \u2026 wow\u2026 us \u2026 together\u2026 wow\u2026. wow"],"filename":"manelo"},{"name":"Gerott","dialogue":["I applied to this show cause I dared to dream that someone else could love cheese as much as I do","Ever since I was a baby I had a special connection to cheese. I cant even imagine a world without it, Im so thankful for the dairy industry. For the cows. The goats\u2026 all of them. If any of you are watching the Ratchelor out there and helped make cheese, I wanna say thank you.","My what a lovely vieux lille cheese smell! Wait a second\u2026 I\'m holding a swiss cheese, could it be\u2026 the smell is coming from you! My nose does not deceive me! The smell of a vieux lille, washed with a brine for three months makes it a truly superb cheese-smell, the smell just comes natural to you! Wow!","Your eyes have the luster of a smoked gouda dream. Your witt is sharp as cheddar. I wish to travel the world with you and sample from the finest charcuterie boards found on this lovely planet of ours","I know this might sound like a lot but I just.. I think I need to tell you that I think I love you more than I love cheese? I didnt even think that was possibly but I think thats how I feel. You mean so much to me that I think if you woke up tomorrow and decided you never wanted to eat cheese again It wouldnt change my feelings at all.","Oh wow! Look at your eyes oh wow!! *throws cheese into a corner* I need both paws to stroke your ears! Lets hug and never let go! I dont need cheese! I just needed you the whole time! This is life changing!"],"filename":"gerott"},{"name":"Hemptin","dialogue":["I Mean I think All things are nice . My best friend is a Ladybug and I always bring him raspberries from the store.","Ive worked at the grocers for a while, I like seeing all the regulars and helping them get there favorite berries; Gerott always asks for my cheese recommendations since I know a lot about whats in stock.","When I was a kid me and my brothers and sisters used to jump the fence and tend to our neighbors garden before she got home each day. She won biggest Cucumber at the county fair and we where so proud","I was making a fruit salad the other day and I found the lovelies strawberry, it has a flower attached to it and it smelled so sweet,... it reminded me of you actually. I brought you some","I brought you some raspberries and strawberries - I know the catering here is great but I think theres nothing better then a sweet small berry","What makes me special? Well I mean I dont think I\'m any more special than anyone else in the world, but I also think that means no one is unimportant. I think we\'re all special in different ways but I know you\'re special to me"],"filename":"hemptin"},{"name":"One-Eared Jerio","dialogue":["Do you wanna go down to the park with me sometime? I used to go there all the time as a kid and I know where the loveliest dandelion patch grows - just behind the community center. There so pretty and lovely. You\'d fit right in. Oh we can have a picnic","I dont know, I wouldn\'t mind going hiking, especially not with you, but Im worried... about the bugs or what if we run into some mean cockroaches... Idk, I know you\'d protect me but I don\'t want to put you in danger","Sorry Im just a little nervous cause I like you so much. Here\'s some tea, we can drink it together. Make sure to grab the mug by the handle! I dont want you to get burnt","You know my mom always said I could do what ever I wanted with my life, but I never knew what I wanted to be. Now I know all I want is to be with you","Did it get really hot in here? Wait whats that loud thumping? Where is it coming from? Oh! Its just my heart, gosh it feels like its going to jump out of my chest. Maybe I shouldnt have had so much coffee. Oh my gosh I like you a lot I\'m afraid I\'m going to blow it! I already messed up didnt I?","You believed in me! You inspire me to be better! I am going to start therapy so I can manage my a n x i e t y. I am also going to try to quit caffeine and switch to warm water. I cant wait to introduce you to my mom! She is going to love you! Oh! I love you!"],"filename":"oneearedjerio"},{"name":"Largothon","dialogue":["Um Yeah you gotta watch out in situations like that. Cant just expect everything to go how you want it, make sure to keep your eye on whats good.","Always remember to check the GPS before you leave home, wouldnt want to get lost or get into an unexpected situation","One time Roger-Doger and I were wandering around the east sewer pipeline and ran into a bunch of feral cats - had to be there for a job but we left when we saw them - not worth risking a life over, never trusted our boss again after that so I quit and did a few stints as a souffle chef","Look I mean, I think cuisine is overrated but If I had a choice between the smelliest cheese from paris and a crumb that fell off some bikers\' sandwich, id choose parisian delicacy everytime.","If you\'re gonna go out hiking, make sure you bring trail mix or some snacks for the road. I tell ya there\'s nothing worse than losing consciousness in the wilderness with no one else around. Actually, only thing worse is losing consciousness and the only one around is your enemy.","Listen. All I want is to keep you safe.  Ya know, cared for. I guess you could say, I love you \u2013 as much as one ole rat can love anyone, anyway. Let\'s protect each other. Forever."],"filename":"largothon"}]')},7:function(e){e.exports=JSON.parse('["Wow you\'re so different","Oh wow","Wow!","Okay","That\'s nice","Interesting","Very interesting","Cool","I\'m so sorry to hear that","You\'ve been through so much","I can\'t imagine what that\'s like","Ok","Neat","Thanks for sharing","I appreciate your vulnerability","I appreciate you sharing","I value you","I\'m so glad you\'re here","Uh...","What?","Is that all?","Don\'t look at me like that","Yuck","Care for some juice?"]')}},[[17,1,2]]]);
//# sourceMappingURL=main.09847a21.chunk.js.map