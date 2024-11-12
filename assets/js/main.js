// Initializing Animate On Scroll Js 
AOS.init(); 
// Initializing Isotope with jQuery
    $(document).ready(function() {
        var $grid = $('.allProducts').isotope({
            itemSelector: '.product-item',
            layoutMode: 'fitRows'
        });

        // Filter items when filter buttons are clicked
        $('.nav button').on('click', function() {
            var filterValue = $(this).attr('data-filter');
            // Apply the filter to Isotope
            $grid.isotope({ filter: filterValue });
        });
    });
// Swiper Js
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
    });

    // Cart LocalStorage ()
    function renderCart(items) {
        const $cart = document.querySelector(".cart");
        const $total = document.querySelector(".total");
        let totalQuantity = 0;

        $cart.innerHTML = items.map((item) => {
            totalQuantity += item.quantity;
            return `
                <tr>
                    <td>
                        <div class="d-flex justify-content-center align-items-center py-3">
                            <div class="col-2">
                                <img src="./assets/img/${item.img}" alt="${item.name}" class="img-fluid rounded">
                            </div>
                            <div class="col px-2">
                                <h5>${item.name}</h5>
                                <div class="d-flex justify-content-start align-items-center">
                                    <div class="col pe-2">
                                        <button type="button" class="btn btn-block btn-sm btn-outline-primary w-100" onClick="updateCartQuantity(${item.id}, 1)">+</button>
                                    </div>
                                    <div class="col">
                                        <input class="w-100" value="${item.quantity}" readonly>
                                    </div>
                                    <div class="col ps-2">
                                        <button type="button" class="btn btn-block btn-sm btn-outline-primary w-100" onClick="updateCartQuantity(${item.id}, -1)">-</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-1 text-end">
                                <button class="btn btn-outline-danger btn-sm" onClick="removeCartItem(${item.id})"><i class="bi bi-trash"></i></button>
                            </div>
                        </div>
                    </td>
                </tr>`;
        }).join("");

        $total.innerHTML = "$" + cartLS.total();
    }

    function updateCartQuantity(itemId, amount) {
        cartLS.quantity(itemId, amount);
        renderCart(cartLS.list());
    }

    function removeCartItem(itemId) {
        cartLS.remove(itemId);
        renderCart(cartLS.list());
    }

    // Initial render
    renderCart(cartLS.list());

    // Update cart when it changes
    cartLS.onChange(() => {
        renderCart(cartLS.list());
    });

    