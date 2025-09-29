import collegeLogo from "../images/collegelogo.png"

export default function Header() {
    return (
        <header>
            <img className="logo" src={ collegeLogo } alt="Cap on Books" />
            <span className="title">StudentTrac</span>
        </header>
    )
}