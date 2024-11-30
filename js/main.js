(() => {
  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const loader = document.querySelector("#loader");

  
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes
  //this is the api url https://swiftpixel.com/earbud/api/materials


  //functions

 
  function loadInfoBoxes() {

// loading indicator here 
    loader.classList.toggle("hidden");

    //make AJAX call here
      fetch('https://swiftpixel.com/earbud/api/infoboxes')
      .then(response => response.json())
      .then(infoBoxes => {
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);
    
          const titleElement = document.createElement('h2');
          titleElement.textContent = infoBox.heading;
    
          const textElement = document.createElement('p');
          textElement.textContent = infoBox.description;
    
          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        })

        loader.classList.toggle("hidden")
        ;
        materialTemplate,innerHTML = '';
        materialList.innerHTML = '';

        })
      //error message goes in catch
      .catch(error => {
        console.log(error)
  
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Oops, something went wrong, Please check your internet connection or try again later";
        materialTemplate.appendChild(errorMessage);
  
    });
  }

  loadInfoBoxes();

// loading indicator here
  function loadMaterialInfo() {

    //make AJAX call here

    fetch('https://swiftpixel.com/earbud/api/materials')
    .then(response => response.json())
    .then(materialListData => {
      materialListData.forEach(material=> {
        // clone the template

        const clone = materialTemplate.content.cloneNode(true);
        // populate the template
        const materialHeading = clone.querySelector('.material-heading');
        materialHeading.textContent = material.heading;

        const paragraphDescription = clone.querySelector('.material-description');
        paragraphDescription.textContent = material.description;

        materialList.appendChild(clone);
      });
    })
    //error message goes in catch
    .catch(error => {
      console.log(error)

      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Oops, something went wrong, Please check your internet connection or try again later";
      materialList.appendChild(errorMessage); 

  });

  }

  loadMaterialInfo();


  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });





})();
