document.addEventListener("DOMContentLoaded", () => {
    const sidebarOpenBtn = document.getElementById('sidebar-open-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');

    const rsSidebar = document.querySelector('.rs-sidebar');
    sidebarOpenBtn.addEventListener('click', () => {
        rsSidebar.classList.remove('-translate-x-100');
    });

    sidebarCloseBtn.addEventListener('click', () => {
        rsSidebar.classList.add("-translate-x-100");
    });

    document.addEventListener('click', (e) => {
        const isClickInsideSidebar = rsSidebar.contains(e.target);
        const isClickOnSidebarButton = sidebarOpenBtn.contains(e.target);

        if(!isClickInsideSidebar && !isClickOnSidebarButton) {
            rsSidebar.classList.add('-translate-x-100');
        }
    })

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

    // CUSTOM DRODOWN
    const csDropdownMenu = document.querySelector('.cs-dropdown-menu');
    const csDropdownOptions = csDropdownMenu.querySelectorAll('.cs-dropdown-option');

    if (csDropdownOptions.length > 0) {
        const firstOption = csDropdownOptions[0];
        firstOption.classList.add('bg-[#ECF4FF]');
        firstOption.querySelector('.dropdown-icon').classList.remove("hidden");
        firstOption.querySelector('.dropdown-text').classList.add('text-black');
        csDropdownMenu.querySelector('.datepicker-value').textContent = firstOption.querySelector('.dropdown-text').textContent;
    }

    document.addEventListener('click', function (e) {
        const isLightpickOpen = document.querySelector('.lightpick:not(.is-hidden)') !== null;

        if (isLightpickOpen && !e.target.closest('.cs-dropdown')) {
            return;
        }

        const dropdownBox = e.target.closest('.cs-dropdown-menu');

        if (dropdownBox) {
            const dropdownSelect = dropdownBox.querySelector('.cs-dropdown-select');
            dropdownSelect.classList.remove("hidden");

            const options = dropdownSelect.querySelectorAll('.cs-dropdown-option');
            const selectedText = dropdownBox.querySelector('.datepicker-value');

            dropdownSelect.addEventListener('click', function (event) {
                const option = event.target.closest('.cs-dropdown-option');
                if (option) {
                    options.forEach(opt => {
                        opt.classList.remove('bg-[#ECF4FF]');
                        opt.querySelector('.dropdown-icon').classList.add("hidden");
                        opt.querySelector('.dropdown-text').classList.remove('text-black');
                    });

                    option.classList.add('bg-[#ECF4FF]');
                    option.querySelector('.dropdown-text').classList.add('text-black');
                    option.querySelector('.dropdown-text').classList.remove('hidden');
                    option.querySelector('.dropdown-icon').classList.remove("hidden");

                    if (selectedText) {
                        selectedText.textContent = option.querySelector('.dropdown-text').textContent;
                    }

                    dropdownSelect.classList.add("hidden");
                }
            });
        } else {
            document.querySelectorAll('.cs-dropdown-select').forEach(select => select.classList.add('hidden'));
        }
    });


});