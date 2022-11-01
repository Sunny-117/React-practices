export function Mailto({ email, subject, body, ...props }) {
    return (
        <a href={`mailto:${email}?subject=${subject || ''}&body=${body || ''}`}>{props.children}</a>
    );
}