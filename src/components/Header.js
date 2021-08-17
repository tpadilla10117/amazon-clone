    import Image from 'next/image';

    function Header () {

        return (
            <header>
            {/* Top Nav: */}
                <div>
                    <Image
                        src="https://links.papareact.com/f90"
                        width={150}
                        height={40} />
                </div>

            {/* Bottom Nav: */}
                <div>

                </div>
               
            </header>
        );
    };

    export default Header;