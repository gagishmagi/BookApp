var deleteBtn = document.querySelectorAll(".delete-button");
console.log(deleteBtn);

for (let deletebtn of deleteBtn) {
    deletebtn.addEventListener("click", (e) => { return (confirm("Are you sure?"))? true: e.preventDefault(); })
}
