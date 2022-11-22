const app = new Vue({
  el: "#app",
  data: {
    lessons: lessons,
    onHome: true,
    ascending: true,
    sortBy: "subject",
    cart: [],
    search: "",
  },
  methods: {
    
    changePage() {
      this.onHome = !this.onHome;
    },
     //add productto cart
    addToCart(item) {
      this.cart.push(item);
    },
    
    canAddToCart(item) {
      return item.Space > this.cartCount(item);
    },
    // Item Cart count
    cartCount(item) {
      let count = 0;
      for (var i = 0; i < this.cart.length; i++) {
        if (this.cart[i] === item) {
          count++;
        }
      }
      return count;
    },
    //Remove item from cart
    removeFromCart(item) {
      //Remove 1 item from cart
      this.cart.splice(this.cart.indexOf(item), 1);
      //Switch to home page if cart becomes empty
      if (this.cart.length <= 0) {
        this.changePage();
      }
    },
    //Confirmation of order
    submitForm() {
      alert("Your order has been Submitted");
    },
  },
  computed: {
    //Searching & Sorting of products
    filteredLessons: function () {
      let tempLessons = this.lessons;

      //Search Function
      if (this.search != "") {
        tempLessons = tempLessons.filter((item) => {
          return (
            item.Subject.toLowerCase().match(this.search.toLowerCase()) ||
            item.Location.toLowerCase().match(this.search.toLowerCase())
          );
        });
      }

      //Sorting Function
      tempLessons = tempLessons.sort((a, b) => {
        //Sorting by subject
        if (this.sortBy == "subject") {
          let fa = a.Subject.toLowerCase(),
            fb = b.Subject.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        }
        //Sorting by price
        else if (this.sortBy == "price") {
          return a.Price - b.Price;
        }
        //Sorting by location
        else if (this.sortBy == "location") {
          let fa = a.Location.toLowerCase(),
            fb = b.Location.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        }
        //Sorting by space
        else if (this.sortBy == "space") {
          return a.Space - b.Space;
        }
      });
      //Descending order
      if (!this.ascending) {
        tempLessons.reverse();
      }

      return tempLessons;
    },
    // Number of products in Cart
    cartItemCount: function () {
      return this.cart.length || "";
    },
  },
  	
		myFunction:	function()  {
			// to search
			  // Declare variables
			  var input, filter, table, tr, td, i, txtValue;
			  input = document.getElementById("myInput");
			  filter = input.value.toUpperCase();
			  table = document.getElementById("myTable");
			  tr = table.getElementsByTagName("tr");

			  // Loop through all table rows, and hide those who don't match the search query
			  for (i = 0; i < tr.length; i++) {
				td = tr[i].getElementsByTagName("td")[4];
				if (td) {
				  txtValue = td.textContent || td.innerText;
				  if (txtValue.toUpperCase().indexOf(filter) > -1) {
					tr[i].style.display = "";
				  } else {
					tr[i].style.display = "none";
				  }
				}
			  }
			},
  });