import './style.scss';

export default function FeaturesPage() {
    return (
        <main className="features-page">
            <div className="container">
                <h1 className="features-heading">Features</h1>
                <div className="features-overral">
                    <p>The main aim of creating FWR blocks is to help designers, developers and agencies create websites and web apps quickly and easily. Each and every block uses minimal custom styling and is based on the utility first Tailwind framework.</p>
                </div>
                <a href="" className="button-learn-more">Learn More</a>

                <div className="block-features">
                    <div className="block">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-slot="icon" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clip-rule="evenodd" />
                        </svg>
                        <h3>Fresh Design</h3>
                        <p className="features-desc">FWR blocks bring in an air of fresh design with their creative layouts and blocks, which are easily customizable.</p>
                    </div>

                    <div className="block">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-slot="icon" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M14.447 3.026a.75.75 0 0 1 .527.921l-4.5 16.5a.75.75 0 0 1-1.448-.394l4.5-16.5a.75.75 0 0 1 .921-.527ZM16.72 6.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 0 1 0-1.06Zm-9.44 0a.75.75 0 0 1 0 1.06L2.56 12l4.72 4.72a.75.75 0 0 1-1.06 1.06L.97 12.53a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                        </svg>
                        <h3>Clean Code</h3>
                        <p className="features-desc">FWR blocks bring in an air of fresh design with their creative layouts and blocks, which are easily customizable.</p>
                    </div>

                    <div className="block">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-slot="icon" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 6.75a5.25 5.25 0 0 1 6.775-5.025.75.75 0 0 1 .313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 0 1 1.248.313 5.25 5.25 0 0 1-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 1 1 2.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0 1 12 6.75ZM4.117 19.125a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd" />
                        </svg>
                        <h3>Perfect Tool</h3>
                        <p className="features-desc">FWR blocks bring in an air of fresh design with their creative layouts and blocks, which are easily customizable.</p>
                    </div>
                </div>
            </div>
        </main>
    )
}