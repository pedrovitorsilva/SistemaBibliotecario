/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
// Alert box design by Igor Ferrão de Souza: https://www.linkedin.com/in/igor-ferr%C3%A3o-de-souza-4122407b/

function cuteAlert({
  type,
  title,
  message,
  buttonText = "OK",
  confirmText = "OK",
  cancelText = "Cancel",
  closeStyle,
}) {
  return new Promise((resolve) => {
    setInterval(() => {}, 5000);
    const body = document.querySelector("body");

    const scripts = document.getElementsByTagName("script");
    let currScript = "";

    for (const script of scripts) {
      if (script.src.includes("cute-alert.js")) {
        currScript = script;
      }
    }

    let { src } = currScript;

    src = src.substring(0, src.lastIndexOf("/"));

    let closeStyleTemplate = "alert-close";
    if (closeStyle === "circle") {
      closeStyleTemplate = "alert-close-circle";
    }

    let btnTemplate = `
    <button class="alert-button ${type}-bg ${type}-btn">${buttonText}</button>
    `;
    if (type === "question") {
      btnTemplate = `
      <div class="question-buttons">
      <button class="cancel-button error-bg error-btn">${cancelText}</button>
      <button class="confirm-button ${type}-bg ${type}-btn">${confirmText}</button>
      </div>
      `;
    }

    const template = `
    <div class="alert-wrapper">
      <div class="alert-frame">
        <div class="alert-header ${type}-bg">
          <span class="${closeStyleTemplate}">X</span>
          <img class="alert-img" src="${src}/img/${type}.svg" />
        </div>
        <div class="alert-body">
          <span class="alert-title">${title}</span>
          <span class="alert-message">${message}</span>
          ${btnTemplate}
        </div>
      </div>
    </div>
    `;

    body.insertAdjacentHTML("afterend", template);

    const alertWrapper = document.querySelector(".alert-wrapper");
    const alertFrame = document.querySelector(".alert-frame");
    const alertClose = document.querySelector(`.${closeStyleTemplate}`);

    if (type === "question") {
      const confirmButton = document.querySelector(".confirm-button");
      const cancelButton = document.querySelector(".cancel-button");

      confirmButton.addEventListener("click", () => {
        alertWrapper.remove();
        resolve("confirm");
      });

      cancelButton.addEventListener("click", () => {
        alertWrapper.remove();
        resolve();
      });
    } else {
      const alertButton = document.querySelector(".alert-button");

      alertButton.addEventListener("click", () => {
        alertWrapper.remove();
        resolve();
      });
    }

    alertClose.addEventListener("click", () => {
      alertWrapper.remove();
      resolve();
    });

    alertWrapper.addEventListener("click", () => {
      alertWrapper.remove();
      resolve();
    });

    alertFrame.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  });
}

function cuteToast({ type, message, timer = 5000 }) {
  return new Promise((resolve) => {
    const body = document.querySelector("body");

    const scripts = document.getElementsByTagName("script");
    let currScript = "";

    for (const script of scripts) {
      if (script.src.includes("cute-alert.js")) {
        currScript = script;
      }
    }

    let { src } = currScript;

    src = src.substring(0, src.lastIndexOf("/"));

    const toastContainer = document.querySelector(".toast-container");

    // Create the container if it doesn't exist
    if (!toastContainer) {
      const container = document.createElement("div");
      container.classList.add("toast-container");
      body.appendChild(container);
    }

    const container = document.querySelector(".toast-container");

    const template = `
    <div class="toast-item ${type}-bg">
      <div class="toast-frame">
        <img class="toast-img" src="${src}/img/${type}.svg" />
        <span class="toast-message">${message}</span>
        <div class="toast-close">X</div>
      </div>
      <div class="toast-timer ${type}-timer" style="animation: timer ${timer}ms linear;"></div>
    </div>
    `;

    const toastItem = document.createElement("div");
    toastItem.innerHTML = template;
    container.appendChild(toastItem);

    setTimeout(() => {
      toastItem.remove();
      // Remove the container if there are no toasts remaining
      if (container.children.length === 0) {
        container.remove();
      }
      resolve();
    }, timer);

    const toastClose = toastItem.querySelector(".toast-close");

    toastClose.addEventListener("click", () => {
      toastItem.remove();
      // Remove the container if there are no toasts remaining
      if (container.children.length === 0) {
        container.remove();
      }
      resolve();
    });
  });
}
