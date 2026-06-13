import Hero from '../components/Hero';
import QuickServices from '../components/QuickServices';
import VisionMission from '../components/VisionMission';
import LatestNews from '../components/LatestNews';
import FeaturedProducts from '../components/FeaturedProducts';
import TourismSpotlight from '../components/TourismSpotlight';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div>
      <Hero onNavigate={onNavigate} />
      <QuickServices onNavigate={onNavigate} />
      <VisionMission />
      <LatestNews onNavigate={onNavigate} />
      <FeaturedProducts onNavigate={onNavigate} />
      <TourismSpotlight onNavigate={onNavigate} />
    </div>
  );
}
