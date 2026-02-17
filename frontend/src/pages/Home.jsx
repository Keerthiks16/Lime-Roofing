import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Amenities from '../components/Amenities';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Township from '../components/Township';
import FloorPlans from '../components/FloorPlans';
import Developer from '../components/Developer';
import ConstructionUpdates from '../components/ConstructionUpdates';
import VideoTour from '../components/VideoTour';
import Loader from '../components/Loader';

const Home = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data } = await API.get('/content');
      const contentMap = data.reduce((acc, item) => {
        acc[item.name] = item;
        return acc;
      }, {});
      setContent(contentMap);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero data={content.hero} />
      <About data={content.about} />
      <div className="h-24 bg-gradient-to-b from-[#def8ed] to-[#f1fcf7]" />
      <Amenities data={content.amenities} />
      <Township data={content.township} />
      <FloorPlans data={content.floorplans} />
      <VideoTour data={content.video} />
      <Developer data={content.developer} />
      <ConstructionUpdates data={content.construction} />
      <FAQ data={content.faq} />
      <Footer />
    </div>
  );
};

export default Home;
