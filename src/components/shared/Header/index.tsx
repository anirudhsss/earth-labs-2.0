import Header from './Header';

export interface TwitterHeaderProps {
    homeLocation?: any;
}

export { Header };

export const TwitterHeader = ({
    homeLocation,
}: TwitterHeaderProps) => {
    return (
        // <Header></Header>
        <p>Hello</p>
    )
}