var stripe = Stripe('pk_test_1Lt7NGUWJohZYv1RpoCzvjio');
var elements = stripe.elements();
var card = elements.create('card');
card.mount('#card-element');
function setOutcome(result) {
 var input = document.createElement("input");
 input.name = "token";
 input.value = result.token.id;
 document.querySelector('form').appendChild(input);
 document.querySelector('form').submit();
}
document.querySelector('form').addEventListener('submit', function(e) {
 e.preventDefault();
 stripe.createToken(card).then(setOutcome);
});
