import AdvantageSection from '@/components/marketing/advantage-section';
import CtaSection from '@/components/marketing/cta-section';
import Hero from '@/components/marketing/hero';
import ServicesSection from '@/components/marketing/services-section';
import MarketingLayout from '@/layouts/marketing-layout';

interface PageProps {
    services: {
        title: string;
        description: string;
        tags: string[];
        icon: string;
    }[];
    stats: {
        label: string;
        value: string;
    }[];
    advantages: {
        title: string;
        description: string;
        icon: string;
    }[];
    cta: {
        headline: string;
        subtext: string;
        primaryLabel: string;
        primaryHref: string;
        secondaryLabel: string;
        secondaryHref: string;
    };
}

export default function Home({ services, stats, advantages, cta }: PageProps) {
    return (
        <MarketingLayout>
            <Hero stats={stats} />
            <ServicesSection services={services} />
            <AdvantageSection advantages={advantages} />
            <CtaSection cta={cta} />
        </MarketingLayout>
    );
}
