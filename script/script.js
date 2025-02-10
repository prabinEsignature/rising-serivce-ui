document.addEventListener("DOMContentLoaded", () => {
    // new Litepicker({ element: document.getElementById('datepicker') });

    document.querySelectorAll(".open-cs-modal").forEach(button => {
        button.addEventListener('click', (event) => {
            const targetButton = event.target.closest(".open-cs-modal");
            const targetModalId = targetButton?.getAttribute("data-cs-target");
            const targetModal = document.getElementById(targetModalId.replace("#", ""));
            if (targetModal) {
                targetModal.classList.remove("invisible", "opacity-0");
            }
        });
    });

    document.querySelectorAll(".cs-modal").forEach(modal => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.classList.add("invisible", "opacity-0");
            }
        });

        modal.querySelector(".close-cs-modal").addEventListener("click", () => {
            modal.classList.add("invisible", "opacity-0");
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            document.querySelectorAll(".cs-modal").forEach(modal => {
                modal.classList.add("invisible", "opacity-0");
            });
        }
    });

    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileName');

    if (fileInput) {
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                fileNameDisplay.textContent = file.name;
            } else {
                fileNameDisplay.textContent = 'No file selected';
            }
        });
    }

    document.querySelectorAll('.cs-password-elem').forEach(passwordElem => {
        const passwordInput = passwordElem.querySelector('.password-input');
        const toggleButton = passwordElem.querySelector(".toggle-password");

        toggleButton.addEventListener('click', () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                toggleButton.innerHTML = '<i class="fas fa-eye"></i>';
            } else {
                passwordInput.type = "password";
                toggleButton.innerHTML = '<i class="fas fa-eye-slash"></i>';
            }
        });
    });
});