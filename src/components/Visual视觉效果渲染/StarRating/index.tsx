function Star({ marked, starId }) {
    return (
        <span star-id={starId} style={{ color: "#ff9933" }} role="button">
            {/* 空星，实星 */}
            {marked ? "\u2605" : "\u2606"}
        </span>
    );
}