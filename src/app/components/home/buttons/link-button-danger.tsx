import Link from "next/link";

interface LinkButtonProps {
    link: string;
    text: string;
}

export default function LinkButton( props: LinkButtonProps ) {
    return (
        <Link href={props.link} className="danger-button">
            {props.text}
        </Link>
    );
}