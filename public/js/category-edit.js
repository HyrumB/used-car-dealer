document.addEventListener("DOMContentLoaded", function () {
  const editInputs = document.getElementById("edit_inputs");
  const categoryNameInput = document.getElementById("category_name_input");
  const descriptionInput = document.getElementById("description_input");

  const selectElement = document.getElementById("category_id");

  // delete
  const deleteInput = document.getElementById("delete_category_id");
  const deleteButton = document.getElementById("delete_button");


  selectElement.addEventListener("change", function () {
    // console.log(selectElement);

    if (selectElement.value) {
      const selectedOption = selectElement.options[selectElement.selectedIndex];
      const categoryName = selectedOption.getAttribute("data_name");
      const description = selectedOption.getAttribute("data_description");
      const image = selectedOption.getAttribute("data_image");
      const id = selectedOption.getAttribute("value");
      // console.log(selectedOption);
      
      categoryNameInput.value = categoryName;
      descriptionInput.value = description;
      deleteInput.value = id;
      editInputs.style.display = "block"; // Show the edit Inputs
      deleteButton.style.display = "block";

    } else {
      editInputs.style.display = "none"; // Hide the edit Inputs if no category is selected
      deleteButton.style.display = "none";

      categoryNameInput.value = "";
      descriptionInput.value = "";
      deleteInput.value = "";
    }
  });
});
