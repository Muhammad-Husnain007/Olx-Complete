import React from 'react';
import './StyleCards.css'; // Make sure to have the correct path to the CSS file
import Card from './Card';
import mobile from './CardsAssests/mobile.png';
import key from './CardsAssests/key.png';
import bike from './CardsAssests/bikes.png';
import kid from './CardsAssests/kids.png';
import electronic from './CardsAssests/electronics.png';
import book from './CardsAssests/books.png';
import animal from './CardsAssests/animal.png';
import property from './CardsAssests/property.png';
import service from './CardsAssests/services.png';
import business from './CardsAssests/business.png';
import vehicle from './CardsAssests/vehicle.png';
import job from './CardsAssests/jobs.png';
import furniture from './CardsAssests/furniture.png';
import fashion from './CardsAssests/fashion.png'; // Add the missing import

const Cards = () => {
  return (
    <div className='All-Cards'>
    <p>All categories</p>
      <div className='cards-row-1'>
        <Card imageSrc={mobile} spanText="Mobiles" />
        <Card imageSrc={vehicle} spanText="Vehicles" /> 
        <Card imageSrc={bike} spanText="Bikes &&" />    
        <Card imageSrc={business} spanText="Business" />
        <Card imageSrc={furniture} spanText="Furniture" />
        <Card imageSrc={electronic} spanText="Electronics" />
        <Card imageSrc={service} spanText="Services"  />
      </div>
      <div className='cards-row-2'>
        <Card imageSrc={kid} spanText="Kids &&" />
        <Card imageSrc={fashion} spanText="Fashion" />
        <Card imageSrc={animal} spanText="Animals" />
        <Card imageSrc={book} spanText="Books &&" />
        <Card imageSrc={key} spanText="Key &&" />
        <Card imageSrc={property} spanText="Property" />
        <Card imageSrc={job} spanText="Jobs &&" />
      </div>
    </div>
  );
};

export default Cards;
