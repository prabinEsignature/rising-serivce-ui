document.addEventListener("DOMContentLoaded", () => {
    const sidebarOpenBtn = document.getElementById('sidebar-open-btn');
    const sidebarCloseBtn = document.getElementById('sidebar-close-btn');

    const rsSidebar = document.querySelector('.rs-sidebar');
    sidebarOpenBtn?.addEventListener('click', () => {
        rsSidebar.classList.remove('-translate-x-100');
    });

    sidebarCloseBtn?.addEventListener('click', () => {
        rsSidebar.classList.add("-translate-x-100");
    });

    document.addEventListener('click', (e) => {
        const isClickInsideSidebar = rsSidebar?.contains(e.target);
        const isClickOnSidebarButton = sidebarOpenBtn?.contains(e.target);

        if (!isClickInsideSidebar && !isClickOnSidebarButton) {
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
    const csDropdownOptions = csDropdownMenu?.querySelectorAll('.cs-dropdown-option');

    function resetDropdown() {
        if (!csDropdownMenu || !csDropdownOptions?.length) return;
        const firstOption = csDropdownOptions[0];

        csDropdownOptions.forEach(opt => {
            opt.classList.remove('bg-[#ECF4FF]');
            opt.querySelector('.dropdown-icon')?.classList.add("hidden");
            opt.querySelector('.dropdown-text')?.classList.remove('text-black');
        });

        firstOption.classList.add('bg-[#ECF4FF]');
        firstOption.querySelector('.dropdown-icon')?.classList.remove("hidden");
        firstOption.querySelector('.dropdown-text')?.classList.add('text-black');

        csDropdownMenu.querySelector('.datepicker-value').textContent =
            firstOption.querySelector('.dropdown-text')?.textContent || '';

        document.querySelectorAll('.cs-dropdown-select').forEach(select => select.classList.add('hidden'));
    }

    resetDropdown();

    document.addEventListener('mousedown', (e) => {
        const isLightpickOpen = !!document.querySelector('.lightpick:not(.is-hidden)');
        const dropdownBox = e.target.closest('.cs-dropdown-menu');
        if (isLightpickOpen && !e.target.closest('.cs-dropdown')) return;
        document.querySelectorAll('.cs-dropdown-select').forEach(select => select.classList.add('hidden'));

        if (dropdownBox) {
            const dropdownSelect = dropdownBox.querySelector('.cs-dropdown-select');
            dropdownSelect?.classList.remove("hidden");

            dropdownSelect?.addEventListener('click', (event) => {
                const option = event.target.closest('.cs-dropdown-option');
                if (!option) return;

                dropdownSelect.querySelectorAll('.cs-dropdown-option').forEach(opt => {
                    opt.classList.remove('bg-[#ECF4FF]');
                    opt.querySelector('.dropdown-icon')?.classList.add("hidden");
                    opt.querySelector('.dropdown-text')?.classList.remove('text-black');
                });

                option.classList.add('bg-[#ECF4FF]');
                option.querySelector('.dropdown-icon')?.classList.remove("hidden");
                option.querySelector('.dropdown-text')?.classList.add('text-black');

                const selectedText = dropdownBox.querySelector('.datepicker-value');
                if (selectedText) {
                    selectedText.textContent = option.querySelector('.dropdown-text')?.textContent;
                }

                dropdownSelect.classList.add("hidden");
            }, { once: true }); // Ensure only one click event is added
        }
    });

    const picker = new Lightpick({
        field: document.getElementById('datepicker'),
        singleDate: true,
        format: 'DD/MM/YYYY', // Set format to dd/mm/yyyy

        // onSelect: function (start, end) {
        //     var str = '';
        //     str += start ? start.format('DD/MM/YYYY') + ' to ' : '';
        //     str += end ? end.format('DD/MM/YYYY') : '...';
        //     document.querySelector('.cs-dropdown-selected .datepicker-value').innerHTML = str;
        // }
        onSelect: function (date) {
            const csDropdownSeparator = document.querySelector('.cs-dropdown-separator');
            document.querySelector('.cs-dropdown-selected .datepicker-value').innerHTML = date.format('DD/MM/YYYY');
            csDropdownOptions?.forEach(opt => {
                opt.classList.remove('bg-[#ECF4FF]');
                opt.querySelector('.dropdown-icon')?.classList.add("hidden");
                opt.querySelector('.dropdown-text')?.classList.remove('text-black');
            });

            if(csDropdownSeparator){
                csDropdownSeparator.querySelector('.dropdown-icon')?.classList.remove("hidden");
            }
        }
    });

    document.querySelectorAll('[data-dismiss="cs-alert"]').forEach(button => {
        button.addEventListener('click', (e) => {
            const alertBox = e.target.closest('.cs-alert-dismissible');
            if (alertBox) {
                alertBox.classList.add('hidden');
            }
        });
    });
});