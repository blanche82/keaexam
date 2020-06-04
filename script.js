const link = "https://spreadsheets.google.com/feeds/list/1SE4EFIjHhKOYyqUozsYsKmJYHSbUcjxenNSCj5e58y0/1/public/values?alt=json";
var database;

const startSection = document.getElementById("s_start");
const substartSection = document.getElementById("s_substart");
const toolsSection = document.getElementById("s_tools");
const aboutSection = document.getElementById("s_about");
const aboutCardSection = document.getElementById("s_aboutCards");
const contactSection = document.getElementById("s_contact");
const useItSection = document.getElementById("s_useit");
const ddSection = document.getElementById("s_doubled");
const deckSection = document.getElementById("s_deck");
const menuStart = document.getElementById("menu_start");
const menuAbout = document.getElementById("menu_about");
const menuTools = document.getElementById("menu_tools");
const menuContact = document.getElementById("menu_contact");
const toolDDButton = document.getElementById("dd_button");
const toolCardButton = document.getElementById("card_button");
const diamond = document.getElementById("diamond");
const cards = document.getElementById("cards");
const diamondContents = document.getElementById("diamond_contents");
const diamondComments  = document.getElementById("diamond_comments");
const diamondControls  = document.getElementById("diagram_controls");
const cardTemplate = document.getElementById("cardTemplate").content;
const iconCircleTemplate = document.getElementById("iconCircleTemplate").content;
const dt = document.getElementById("dt");
const dtControl = document.getElementById("dt_control");
const filters = document.getElementById("filters");
const mainPage = document.getElementById("mainPage");
const subPage = document.getElementById("subPage");
const subPageCardContainer = document.getElementById("card_split");
const subPageCardContainerCol4 = subPageCardContainer.querySelector(".split_column4");
const subPageCardContainerCol3 = subPageCardContainer.querySelector(".split_column3");
const subPageCardContainerCol12 = subPageCardContainer.querySelector(".split_column12");
const subPageCardContainerCol34 = subPageCardContainer.querySelector(".split_column34");
const subPageCardContainerCol14 = subPageCardContainer.querySelector(".split_column14");
const subPageInfoTemplate = document.getElementById("subPageInfoTemplate").content;

window.addEventListener("scroll", scrollHandler);

//define functions
function loadJSON(link) {
	fetch(link).then(e => e.json()).then(data => database = data.feed.entry); // load JSON and save it in the 'database' variable
}

loadJSON(link);


function createCard(cardData, appendTo=null) {
	let newCard = cardTemplate.cloneNode(true); // clone the template and set all the fields
	newCard.querySelector('.toolCardTitle').textContent = cardData.gsx$name.$t;

	if (cardData.gsx$imageicon.$t != null && cardData.gsx$imageicon.$t != '') {
		newCard.querySelector('.toolCardImage').src = cardData.gsx$imageicon.$t;
		newCard.querySelector('.toolCardIcon').remove();
	} else {	
		newCard.querySelector('.toolCardIcon').textContent = cardData.gsx$icon.$t;
	}
	newCard.querySelector('.toolCardDescription').textContent = cardData.gsx$description.$t;
	let iconTop = document.getElementById("iconTemplate_" + cardData.gsx$category.$t).content.cloneNode(true);
	iconTop.querySelector(".cornerIcon").classList.add('cornerIconTop');
	let iconBottom = document.getElementById("iconTemplate_" + cardData.gsx$category.$t).content.cloneNode(true);
	iconBottom.querySelector(".cornerIcon").classList.add('cornerIconBottom');
	newCard.querySelector('.cornerTopLeft').classList.add("color_" + cardData.gsx$category.$t);
	newCard.querySelector('.cornerTopLeft').appendChild(iconTop)
	newCard.querySelector('.cornerTopRight').classList.add("color_" + cardData.gsx$category.$t);
	newCard.querySelector('.cornerBottomLeft').classList.add("color_" + cardData.gsx$category.$t);
	newCard.querySelector('.cornerBottomRight').classList.add("color_" + cardData.gsx$category.$t);
	newCard.querySelector('.cornerBottomRight').appendChild(iconBottom)
	newCard.querySelector('img.hint').src = 'img/mini' + cardData.gsx$categoryid.$t + '.png';
	if (appendTo == null) {
		if (cardData.gsx$clickable.$t == 1) {
			newCard.querySelector('.toolCard').addEventListener("click", function invokecard() {
				showCard(cardData);
			})
		}
		cards.appendChild(newCard)
	} else {
		newCard.querySelector(".toolCardBody").onmouseenter = "";
		newCard.querySelector(".toolCardBody").onmouseleave = "";
		appendTo.appendChild(newCard);
	}
}

function createIcon(iconData) {
	let newIcon = iconCircleTemplate.cloneNode(true); // clone the template and set all the fields
	newIcon.querySelector('.dd_icon_circle_title').textContent = iconData.gsx$name.$t;
	if (iconData.gsx$imageicon.$t != null && iconData.gsx$imageicon.$t != '') {
		newIcon.querySelector('img').src = iconData.gsx$imageicon.$t;
	} else {	
		newIcon.querySelector('.iconLabel').textContent = iconData.gsx$icon.$t;
	}
	let iconCircle = newIcon.querySelector('.dd_icon_circle');
	iconCircle.style = 'grid-row:' + iconData.gsx$row.$t + (iconData.gsx$span.$t != null ? '/ span ' + iconData.gsx$span.$t : '');
	iconCircle.classList.add("col" + iconData.gsx$column.$t);
	if (iconData.gsx$clickable.$t == 0) iconCircle.classList.add("dd_icon_circle_locked");
	else {
		iconCircle.addEventListener("click", function invokecard() {
			showCard(iconData);
		})
	}
	diamondContents.appendChild(newIcon);
}

function cleanActiveMarker() {
	menuStart.classList = "";
	menuAbout.classList = "";
	menuTools.classList = "";
	menuContact.classList = "";
}

function sectionInView(section) {
	return section.getBoundingClientRect().y < window.innerHeight / 2
}

function addAnimationWithDelay(elementId, animation, delay) {
	document.getElementById(elementId).classList.add("animationDelay" + delay);
	document.getElementById(elementId).classList.add(animation);
}


function scrollHandler(event) {
	if (subPageShown) return;
	cleanActiveMarker();
	if (sectionInView(contactSection)) {
		menuContact.classList = "underscore";
		contactSection.querySelector("h2").classList.add("appearHeader");
		contactSection.querySelector("p").classList.add("appearContent");
		contactSection.querySelector("button").classList.add("animationDelay2");
		contactSection.querySelector("button").classList.add("appearContent");

	}
	else if (sectionInView(toolsSection)) {
		menuTools.classList = "underscore";
	}
	else if (sectionInView(aboutSection)) {
		menuAbout.classList = "underscore"
	}
	else if (sectionInView(startSection)) {
		menuStart.classList = "underscore";
		startSection.querySelector("h2").classList.add("appearHeader");
		startSection.querySelector("p").classList.add("appearContent");
		startSection.querySelector("button").classList.add("animationDelay2");
		startSection.querySelector("button").classList.add("appearContent");
	}

	if (sectionInView(deckSection)) {
		deckSection.querySelector("h2").classList.add("appearHeader");
		deckSection.querySelector("p").classList.add("appearContent");
	}

	if (sectionInView(aboutCardSection)) {
		aboutCardSection.querySelector("#aboutCard1").classList.add("appearLeft");
		aboutCardSection.querySelector("#aboutCard2").classList.add("animationDelay5");
		aboutCardSection.querySelector("#aboutCard2").classList.add("appearLeft");
		aboutCardSection.querySelector("#aboutCard3").classList.add("animationDelay9");
		aboutCardSection.querySelector("#aboutCard3").classList.add("appearLeft");
	}

	if (sectionInView(useItSection)) {
		useItSection.querySelector("#s_use_left").classList.add("appearLeft");
		useItSection.querySelector("#s_use_right").classList.add("animationDelay2");
		useItSection.querySelector("#s_use_right").classList.add("appearRight");
	}

		if (sectionInView(substartSection)) {
		substartSection.querySelector("#p_primary").classList.add("appearLeft");
		substartSection.querySelector("#p_secondary").classList.add("animationDelay2");
		substartSection.querySelector("#p_secondary").classList.add("appearLeft");
	}

	if (sectionInView(ddSection)) {
		ddSection.querySelector("h2").classList.add("appearHeader");
		ddSection.querySelector("p").classList.add("appearContent");
		let dot7 = document.getElementById("dot7");
		dot7.addEventListener("webkitAnimationEnd", initiateDiagram);
		dot7.addEventListener("animationend", initiateDiagram);
		let dots = document.getElementsByClassName("dot");
		for (var i = 0; i < dots.length; i++) {
			dots[i].classList.add("dotAppear");
		}
		document.getElementById("diamond").classList.add("diagramAppear");
		document.getElementById("diamond").addEventListener("animationend", function showDiagramComment() {
			document.getElementById("diamond").removeEventListener("animationend", showDiagramComment);
			showdiagramTexts();
			document.getElementById("dots").classList.add("hidden")
		});
		diamondControls.classList.add("animationDelay2");
		diamondControls.classList.add("appearHeader");
	}
	if (sectionInView(deckSection)) {
		deckSection.querySelector("h2").classList.add("appearHeader");
		deckSection.querySelector("h3").classList.add("animationDelay1");
		deckSection.querySelector("h3").classList.add("appearHeader");
		deckSection.querySelector("p").classList.add("animationDelay2");
		deckSection.querySelector("p").classList.add("appearContent");
	}
}

function scrollToHash(hashName) {
	if (subPageShown) showMainPage();
	const target = document.getElementById(hashName);
	window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset, behavior: 'smooth' });
	cleanActiveMarker();
	if (document.getElementById("menu_" + hashName) != null) {
		document.getElementById("menu_" + hashName).classList = "underscore";
	}
}

var cardFilter = null; 

function filter(newFilter) {
	cardFilter = newFilter;
	goToCards();
}


function goToDD() {
	toolDDButton.classList.remove("dd_controls_disabled");
	toolCardButton.classList.add("dd_controls_disabled");
	diamond.classList.remove("hidden");
	diamondContents.classList.remove("hidden");
	diamondComments.classList.remove("hidden");
	cards.classList.add("hidden");
	filters.classList.add("hidden");
	while (cards.firstChild) cards.firstChild.remove(); // remove all cards
}

function goToCards() {
	if (dtShown) {
		flipDT()
	}
	filters.classList.remove("hidden")
	toolDDButton.classList.add("dd_controls_disabled");
	toolCardButton.classList.remove("dd_controls_disabled");
	diamond.classList.add("hidden");
	diamondContents.classList.add("hidden");
	diamondComments.classList.add("hidden");
	cards.classList.remove("hidden");
	while (cards.firstChild) cards.firstChild.remove(); // remove all cards
	database.forEach(card => { 
		if ((cardFilter == null || card.gsx$category.$t == cardFilter) && card.gsx$card.$t == 1) createCard(card)
	 }); // display entries from the database that match the selected category 
}

function initiateDiagram() {
	for (let i = 1; i < 9; i++) {
		let dot = document.getElementById("dot" + i);
		dot.classList = dot.classList + " dotDelay fadeoutDot" + i;
	}
}

var diagramShown = false

function showdiagramTexts() {
	if (diagramShown) return;
	document.getElementById("diamond_comments").classList.add("fadeIn");
	addAnimationWithDelay("dd_left_circle", "appearPopout", 1)
	addAnimationWithDelay("dd_right_circle", "appearPopout", 1)
	addAnimationWithDelay("dd_header_left", "appearHeader", 1)
	addAnimationWithDelay("dd_header_right", "appearHeader", 2)
	addAnimationWithDelay("dd_subheader_1", "appearHeader", 3)
	addAnimationWithDelay("dd_subheader_2", "appearHeader", 4)
	addAnimationWithDelay("dd_subheader_3", "appearHeader", 5)
	addAnimationWithDelay("dd_subheader_4", "appearHeader", 6)
	document.getElementById("dd_subheader_4").addEventListener("animationend", function firstShow() {
		document.getElementById("dd_subheader_4").removeEventListener("animationend", firstShow); 
		showAllIconsOnDD()
	});
}


function showAllIconsOnDD() {
	if (diagramShown) return;
	database.forEach(icon => { if (icon.gsx$diagram.$t == 1) createIcon(icon); }) // display entries from the database that match the selected category 
	diagramShown = true;
}


function showDD() {
	diamond.classList.add("fadeFromBackground");
	diamond.classList.remove("fadeToBackground");
	dt.classList.remove("fadeIn");
	dt.classList.add("fadeOut");
	dt.addEventListener("webkitAnimationEnd", cleanUp);
	dt.addEventListener("animationend", cleanUp);
}

function cleanUp() {
	for (let i = 1; i < 6; i++) {
		let dt_part = document.getElementById("dt_" + i);
		dt_part.classList.remove("dt_" + i + "_animation");
	}
	dt.removeEventListener("webkitAnimationEnd", cleanUp);
	dt.removeEventListener("animationend", cleanUp);
	diamondContents.classList.remove("fadeOut");
	diamondContents.classList.add("fadeIn");
	dt.classList.add('hidden');
}

var dtShown = false;

function flipDT() {
	if (!dtShown) {
		dtShown = true;
		document.getElementById("dt_label").innerHTML = "Hide DT";
		dt.classList.remove('hidden');
		diamond.classList.remove("fadeFromBackground")
		diamond.classList.add("fadeToBackground");
		dt.classList.remove("fadeOut")
		dt.addEventListener("webkitAnimationEnd", moveDT);
		dt.addEventListener("animationend", moveDT);
		dt.classList.add("fadeIn");
		dtControl.src="img/dticon.png"
		diamondContents.classList.add("fadeOut");
	} else {
		dtShown = false;
		document.getElementById("dt_label").innerHTML = "Alignment with DT";
		dtControl.src="img/dticongray.png"
		showDD();
	}
}

function moveDT() {
	for (let i = 1; i < 6; i++) {
		let dt_part = document.getElementById("dt_" + i);
		dt_part.classList = dt_part.classList + " dt_" + i + "_animation";
	}
	dt.removeEventListener("webkitAnimationEnd", moveDT);
	dt.removeEventListener("animationend", moveDT);
}

function unflip(card) {
	if (!card.hover && !card.flipping) {
		let front = card.querySelector(".toolCardIconC");
		let back = card.querySelector(".toolCardDescriptionC");
		back.addEventListener("animationend", function onHalfTurn(event) { // this event listener will activate after 'currentFront' is rotated 90 degrees
			back.removeEventListener("animationend", onHalfTurn); // remove the function from the currentFront
			back.classList.remove("over"); // it is no longer 'over' 
			back.classList.add("under"); // now it is hidden
			back.classList.remove("turnDissapearC"); // remove animation class
			front.addEventListener("animationend", function onFullTurn(event) {  // add event listener which will activate upon complete flip, to do cleanup
				front.removeEventListener("animationend", onFullTurn);  // remove event handler
				front.classList.remove("turnAppearC"); // remove animation class
			});
			front.classList.add("over"); // 'currentBack' is the new top section 
			front.classList.add("turnAppearC"); // add animation to turn it from 90 degrees to 0
			front.classList.remove("under"); // remove 'under' - now it is visible
		});
		back.classList.add("turnDissapearC"); // start the flip animation 
	}
}

function flip(card) {
	if (!card.flipping) {
		card.flipping = true;
		let front = card.querySelector(".toolCardIconC");
		let back = card.querySelector(".toolCardDescriptionC");
		front.addEventListener("animationend", function onHalfTurn(event) { // this event listener will activate after 'currentFront' is rotated 90 degrees
			front.removeEventListener("animationend", onHalfTurn); // remove the function from the currentFront
			front.classList.remove("over"); // it is no longer 'over' 
			front.classList.add("under"); // now it is hidden
			front.classList.remove("turnDissapearC"); // remove animation class
			back.addEventListener("animationend", function onFullTurn(event) {  // add event listener which will activate upon complete flip, to do cleanup
				back.removeEventListener("animationend", onFullTurn);  // remove event handler
				back.classList.remove("turnAppearC"); // remove animation class
				card.flipping = false;
				if (!card.hover) unflip(card)
			});
			back.classList.add("over"); // 'currentBack' is the new top section 
			back.classList.add("turnAppearC"); // add animation to turn it from 90 degrees to 0
			back.classList.remove("under"); // remove 'under' - now it is visible
		});
		front.classList.add("turnDissapearC"); // start the flip animation 
	}
}

function showForm() {
	let intro = contactSection.querySelector("#contactIntro");
	let form = contactSection.querySelector("#contactForm");
	intro.addEventListener("animationend", function onHalfTurn(event) { // this event listener will activate after 'currentFront' is rotated 90 degrees
	intro.removeEventListener("animationend", onHalfTurn); // remove the function from the currentFront
		intro.classList.add("under"); // now it is hidden
		intro.classList.remove("turnDissapearC"); // remove animation class
		form.addEventListener("animationend", function onFullTurn(event) {  // add event listener which will activate upon complete flip, to do cleanup
			form.removeEventListener("animationend", onFullTurn);  // remove event handler
			form.classList.remove("turnAppearC"); // remove animation class
		});
		form.classList.add("turnAppearC"); // add animation to turn it from 90 degrees to 0
		form.classList.remove("under"); // remove 'under' - now it is visible
	});
	intro.classList.add("turnDissapearC"); // start the flip animation 
}

function send() {
	document.getElementById("messageSent").classList.add("appearHeader")

}


var subPageShown = false;

function showCard(card) {
	mainPage.classList.add("hidden");
	subPage.classList.remove("hidden");
	subPageCardContainerCol12.innerHTML = '<button class="backButton" onClick="showMainPage()">&lt;</button>';
	createCard(card, subPageCardContainerCol12);
	subPageShown = true;
	let info = subPageInfoTemplate.cloneNode(true);
	info.querySelector('p').innerHTML = card.gsx$intro.$t;
	info.querySelector('h3').innerHTML = card.gsx$subheader.$t;
	info.querySelector('h2').innerHTML = card.gsx$header.$t;
	subPageCardContainerCol34.appendChild(info);
	window.scrollTo(0, 0);
	cleanActiveMarker();
	subPageCardContainerCol14.innerHTML = card.gsx$largetext.$t;

}

function showMainPage() {
	mainPage.classList.remove("hidden");
	subPage.classList.add("hidden");
	subPageShown = false;
	while (subPageCardContainerCol34.firstChild) subPageCardContainerCol34.firstChild.remove();
	while (subPageCardContainerCol12.firstChild) subPageCardContainerCol12.firstChild.remove(); 
	while (subPageCardContainerCol14.firstChild) subPageCardContainerCol14.firstChild.remove(); 
	window.scrollTo({ top: ddSection.getBoundingClientRect().top + window.pageYOffset, behavior: 'auto' });
}


scrollHandler(0)