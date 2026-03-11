import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let configured = false;

export function configureNotifications() {
  if (configured) return;

  iziToast.settings({
    class: "app-toast",
    timeout: 3200,
    close: true,
    progressBar: true,
    position: "topRight",
    transitionIn: "fadeInLeft",
    transitionOut: "fadeOutRight",
    drag: false,
    maxWidth: 420,
    titleSize: "14",
    messageSize: "13",
    iconColor: "#dbeafe",
    titleColor: "#eff6ff",
    messageColor: "rgba(219, 234, 254, 0.9)",
    backgroundColor: "rgba(15, 23, 42, 0.94)",
  });

  configured = true;
}

function toast(method, options) {
  configureNotifications();
  iziToast[method]({
    ...options,
    layout: 2,
  });
}

export const notify = {
  success(message, title = "Success") {
    toast("success", {
      title,
      message,
      color: "rgba(16, 185, 129, 0.18)",
      progressBarColor: "#34d399",
    });
  },

  error(message, title = "Something went wrong") {
    toast("error", {
      title,
      message,
      color: "rgba(239, 68, 68, 0.18)",
      progressBarColor: "#f87171",
    });
  },

  warning(message, title = "Check this") {
    toast("warning", {
      title,
      message,
      color: "rgba(245, 158, 11, 0.18)",
      progressBarColor: "#fbbf24",
    });
  },

  info(message, title = "Heads up") {
    toast("info", {
      title,
      message,
      color: "rgba(96, 165, 250, 0.18)",
      progressBarColor: "#60a5fa",
    });
  },

  modal(options) {
    return Swal.fire({
      background: "rgba(15, 23, 42, 0.96)",
      color: "#e2e8f0",
      confirmButtonText: "Close",
      confirmButtonColor: "#2563eb",
      backdrop: "rgba(15, 23, 42, 0.75)",
      customClass: {
        popup: "app-swal-popup",
        title: "app-swal-title",
        htmlContainer: "app-swal-body",
        confirmButton: "app-swal-confirm",
      },
      ...options,
    });
  },

  bulletMappingNeeded() {
    return this.modal({
      icon: "info",
      title: "Review bullet updates",
      html: `
        <p>Improved bullet suggestions are ready.</p>
        <p style="margin-top: 0.5rem;">Automatic patching is not mapped to individual experience items yet, so copy the updated bullets into the correct role manually.</p>
      `,
    });
  },
};
