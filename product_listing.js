document.addEventListener('DOMContentLoaded', function () {
	var cart = document.querySelector('.cart');
	var addToCartButtons = document.getElementsByClassName('add_to_cart');
	var table = document.getElementsByTagName('table')[0];
	var shoppingCartToggle = document.getElementById('shoppingCart');
	var total = document.getElementById('total');
	var promo = document.getElementById('promo');
	var cartArr = [];

	var shoppingCartClickCallback = function () {
		if (cart.style.display == 'none') {
			cart.style.display = 'block';
		}
		else cart.style.display = 'none';
	};

	shoppingCartToggle.addEventListener('click', shoppingCartClickCallback);

	var makeTableCell = function () {
		return document.createElement('td');
	};


	var closeHandler = function (event) {
		event.preventDefault();
		var parent = this.parentNode.parentNode;
		var child = this.parentNode;
		var productNum = child.getAttribute('class');
		var index = addedItems.indexOf(productNum);
		addedItems.splice(index, 1);
		parent.removeChild(child);
	};


	//
	var quantityChangeHandler = function (event) {
		event.preventDefault();
		var parent = this.parentNode.parentNode.parentNode;
		var child = this.parentNode.parentNode;
		var price = this.parentNode.previousSibling.textContent;
		var unitTotal = ((Number(price.slice(1)) * Number(this.value))).toFixed(2);
		var index = cartArr.indexOf(child);
		if (Number(this.value) === 0) {
			parent.removeChild(child);
			total.innerHTML = "$" + ((Number(total.textContent.slice(1)) - Number(price.slice(1)) * (this.getAttribute('value') - this.value))).toFixed(2);

		}
		else if (Number(this.value) > Number(this.getAttribute('value'))) {
			this.parentNode.nextSibling.innerHTML = '$' + unitTotal;
			total.innerHTML = "$" + (Number(total.textContent.slice(1)) + Number(price.slice(1)) * (this.value - this.getAttribute('value'))).toFixed(2);
			this.setAttribute('value', this.value);
		}

		else {
			this.parentNode.nextSibling.innerHTML = '$' + unitTotal;
			total.innerHTML = "$" + ((Number(total.textContent.slice(1)) - Number(price.slice(1)) * (this.getAttribute('value') - this.value))).toFixed(2);
			this.setAttribute('value', this.value);
		}


	};

	var addedItems = [];

	var addToCartHandler = function (event) {
		event.preventDefault();
		cart.style.display = 'block';
		var price = this.parentNode.firstChild.textContent;
		var productId = this.parentNode.parentNode.getAttribute('class');

		if (addedItems.indexOf(productId) == -1) {
		var entry = document.createElement('tr');
		entry.setAttribute('class', productId);

		var tdOne = makeTableCell();
		tdOne.innerHTML = "<button>&#10006</button>";
		tdOne.setAttribute('class', 'close');
		tdOne.addEventListener('click', closeHandler);
		entry.appendChild(tdOne);

		table.appendChild(entry);

		var tdTwo = makeTableCell();
		tdTwo.setAttribute('class', 'thumbnail');
		var image = document.createElement('img');
		tdTwo.appendChild(image);
		var src = this.parentNode.parentNode.firstChild.getAttribute('src');
		tdTwo.firstChild.setAttribute('src', src);
		entry.appendChild(tdTwo);

		var tdThree = makeTableCell();
		tdThree.setAttribute('class', 'product_title');
		var p = this.parentNode.parentNode.children[1].textContent;
		tdThree.innerHTML = p;
		entry.appendChild(tdThree);

		var tdFour = makeTableCell();
		tdFour.setAttribute('class', 'unit_price');
		tdFour.innerHTML = price;
		entry.appendChild(tdFour);

		var tdFive = makeTableCell();
		tdFive.setAttribute('class', 'quantity');
		var input = document.createElement('input');
		input.setAttribute('type', 'number');
		input.setAttribute('value', 1);
		tdFive.appendChild(input);
		input.addEventListener('change', quantityChangeHandler);
		entry.appendChild(tdFive);

		var tdSix = makeTableCell();
		tdSix.setAttribute('class', 'itemTotal');
		var itemTotal = Number(price.slice(1)) * input.value;
		tdSix.innerHTML = '$' + itemTotal;
		entry.appendChild(tdSix);

		total.innerHTML = '$' + (Number(total.textContent.slice(1)) + Number(price.slice(1))).toFixed(2);
		addedItems.push(productId);
			
		}

		else {
			var addedInput = document.getElementsByClassName(productId)[1].children[4].firstChild;
			addedInput.value = Number(addedInput.value) + 1;
			var addedItemTotal = document.getElementsByClassName(productId)[1].children[5];
			var num = Number(price.slice(1)) * Number(addedInput.value);
			addedItemTotal.innerHTML = '$' + num.toFixed(2);
			var attrValue = addedInput.getAttribute('value');
			var newValue = Number(attrValue) + 1;
			addedInput.setAttribute('value', newValue);
			total.innerHTML = '$' + (Number(total.textContent.slice(1)) + Number(price.slice(1))).toFixed(2);
	}

	}; 

	var handleAllCartButton = function () {
		
		for (var i = 0; i < addToCartButtons.length; i++) {
			addToCartButtons[i].addEventListener('click', addToCartHandler);
		}
	};

	handleAllCartButton();

	var promoHandler = function (event) {
		var totalPrice = Number(total.textContent.slice(1));
		if (this.value == 'BIGSALE') {
		total.innerHTML = '$' + (totalPrice * 0.95).toFixed(2);
		this.removeEventListener('keyup', promoHandler);
	}
};
	promo.addEventListener('keyup', promoHandler);

});