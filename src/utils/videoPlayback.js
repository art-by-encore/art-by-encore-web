export function warmVideo(video) {
    if (!video || video.dataset.warmed === "true") return;
    video.preload = "auto";
    video.load();
    video.dataset.warmed = "true";
}

export async function playVideoWithSound(video) {
    if (!video) return;

    warmVideo(video);
    video.muted = false;

    if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
        await new Promise((resolve) => {
            if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
                resolve();
                return;
            }
            video.addEventListener("canplay", resolve, { once: true });
        });
    }

    await video.play();
}
