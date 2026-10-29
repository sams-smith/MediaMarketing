/* Echo & Chrome product list.
   The shop grid and every product page read from this one list, so a name,
   price or photo changed here updates everywhere.
   - id:    stays the same; it's what the page link uses (product.html#3)
   - price: the number only, e.g. "625.00"; the pages add the $ sign
   - photos: the 4 images in this piece's collection, e.g. "images/shop/blue-beaded-1.jpg";
             the first one is the shop-grid photo; leave "" for an empty holder
   - alt:   a short description of the photo for screen readers
   - description: the text under the price describing the piece's elements
                  (DRAFT for now: the same placeholder on every product)
   - buyUrl: the piece's checkout link (e.g. a Stripe, Square or PayPal payment link);
             the product page shows a "Buy now" button that goes there.
             Leave "" and the page says "Coming soon" instead.
   - sold:   true once it's sold; the page says "Sold" and the shop photo gets a "Sold" tag
   - buyNote: optional small line under the button (e.g. shipping or lead time) */
window.PRODUCTS = [
  { id: "1",  name: "Product 1",  price: "625.00", photos: ["", "", "", ""], alt: "",
    buyUrl: "", sold: false, buyNote: "",
    description: "Ceramic pendant shade in white clay, fired to cone 6 and finished in a high-gloss glaze. The scalloped rim is pierced and strung with beaded chain, and the shade hangs from a brass socket on cloth-covered cord." },
  { id: "2",  name: "Product 2",  price: "625.00", photos: ["", "", "", ""], alt: "",
    buyUrl: "", sold: false, buyNote: "",
    description: "Ceramic pendant shade in white clay, fired to cone 6 and finished in a high-gloss glaze. The scalloped rim is pierced and strung with beaded chain, and the shade hangs from a brass socket on cloth-covered cord." },
  { id: "3",  name: "Product 3",  price: "625.00", photos: ["", "", "", ""], alt: "",
    buyUrl: "", sold: false, buyNote: "",
    description: "Ceramic pendant shade in white clay, fired to cone 6 and finished in a high-gloss glaze. The scalloped rim is pierced and strung with beaded chain, and the shade hangs from a brass socket on cloth-covered cord." },
  { id: "4",  name: "Product 4",  price: "625.00", photos: ["", "", "", ""], alt: "",
    buyUrl: "", sold: false, buyNote: "",
    description: "Ceramic pendant shade in white clay, fired to cone 6 and finished in a high-gloss glaze. The scalloped rim is pierced and strung with beaded chain, and the shade hangs from a brass socket on cloth-covered cord." },
  { id: "5",  name: "Product 5",  price: "625.00", photos: ["", "", "", ""], alt: "",
    buyUrl: "", sold: false, buyNote: "",
    description: "Ceramic pendant shade in white clay, fired to cone 6 and finished in a high-gloss glaze. The scalloped rim is pierced and strung with beaded chain, and the shade hangs from a brass socket on cloth-covered cord." },
  { id: "6",  name: "Product 6",  price: "625.00", photos: ["", "", "", ""], alt: "",
    buyUrl: "", sold: false, buyNote: "",
    description: "Ceramic pendant shade in white clay, fired to cone 6 and finished in a high-gloss glaze. The scalloped rim is pierced and strung with beaded chain, and the shade hangs from a brass socket on cloth-covered cord." },
  { id: "7",  name: "Product 7",  price: "625.00", photos: ["", "", "", ""], alt: "",
    buyUrl: "", sold: false, buyNote: "",
    description: "Ceramic pendant shade in white clay, fired to cone 6 and finished in a high-gloss glaze. The scalloped rim is pierced and strung with beaded chain, and the shade hangs from a brass socket on cloth-covered cord." },
  { id: "8",  name: "Product 8",  price: "625.00", photos: ["", "", "", ""], alt: "",
    buyUrl: "", sold: false, buyNote: "",
    description: "Ceramic pendant shade in white clay, fired to cone 6 and finished in a high-gloss glaze. The scalloped rim is pierced and strung with beaded chain, and the shade hangs from a brass socket on cloth-covered cord." },
  { id: "9",  name: "Product 9",  price: "625.00", photos: ["", "", "", ""], alt: "",
    buyUrl: "", sold: false, buyNote: "",
    description: "Ceramic pendant shade in white clay, fired to cone 6 and finished in a high-gloss glaze. The scalloped rim is pierced and strung with beaded chain, and the shade hangs from a brass socket on cloth-covered cord." },
  { id: "10", name: "Product 10", price: "625.00", photos: ["", "", "", ""], alt: "",
    buyUrl: "", sold: false, buyNote: "",
    description: "Ceramic pendant shade in white clay, fired to cone 6 and finished in a high-gloss glaze. The scalloped rim is pierced and strung with beaded chain, and the shade hangs from a brass socket on cloth-covered cord." }
];

/* Shared: open the phone menu on any page that has one. */
(function () {
  function wireMenu() {
    var header = document.getElementById('siteHeader');
    var btn = document.getElementById('menuBtn');
    if (!header || !btn) return;
    btn.addEventListener('click', function () {
      var open = !header.classList.contains('is-open');
      header.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close' : 'Menu';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wireMenu);
  else wireMenu();
})();

/* Shared: put a product's first photo into a holder, or its "Photo N" label if there's no photo yet. */
window.fillSlot = function (slot, product) {
  slot.textContent = '';
  var src = product.photo || (product.photos && product.photos[0]) || '';
  if (src) {
    var img = document.createElement('img');
    img.src = src;
    img.alt = product.alt || product.name;
    slot.appendChild(img);
    slot.classList.add('has-photo');
    addSoldTag(slot, product);
  } else {
    var label = document.createElement('span');
    label.textContent = 'Photo coming soon';
    slot.appendChild(label);
    slot.classList.remove('has-photo');
    addSoldTag(slot, product);
  }
};
function addSoldTag(slot, product) {
  if (!product.sold) return;
  var tag = document.createElement('em');
  tag.className = 'sold-tag';
  tag.textContent = 'Sold';
  slot.appendChild(tag);
}
