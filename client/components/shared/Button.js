import Link from "next/link";

const Button = props => {
    return (
        <div className="cursor-pointer">
            <Link href={props.href}>
                <div className="mx-4 font-bold text-lg">
                    {props.title}
                </div>
            </Link>
        </div>
    );
};

export default Button;