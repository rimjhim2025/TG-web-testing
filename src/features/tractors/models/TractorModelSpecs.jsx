'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Tooltip from '@/src/features/tyreComponents/commonComponents/Tooltip';

const TractorDetailsSpecs = ({ tractorDetail, translation, currentLang }) => {
  // State for each section - first section (engine) open initially
  const [openSections, setOpenSections] = useState({
    engine: true,
    transmission: false,
    pto: false,
    brakes: false,
    steering: false,
    fuelTank: false,
    dimension: false,
    hydraulic: false,
    wheels: false,
    others: false,
  });

  // Function to get tooltip content for each specification
  const getTooltipContent = label => {
    const brandModel = `${tractorDetail.brand} ${tractorDetail.model}`;

    // Helper function to replace placeholders in translation strings
    const formatTooltip = (template, fallback) => {
      if (template) {
        return template
          .replace(/\{brand\}/g, tractorDetail.brand)
          .replace(/\{model\}/g, tractorDetail.model)
          .replace(/\{brandModel\}/g, brandModel);
      }
      return fallback
        .replace(/\{brand\}/g, tractorDetail.brand)
        .replace(/\{model\}/g, tractorDetail.model)
        .replace(/\{brandModel\}/g, brandModel);
    };

    const tooltips = {
      // Engine specifications
      'Engine Name': formatTooltip(
        translation?.tractorSpecs?.tooltips?.engineName,
        'The name and model of the engine used in {brandModel} tractor'
      ),
      HP: formatTooltip(
        translation?.tractorSpecs?.tooltips?.hp,
        'Horsepower - The power output of the {brandModel} engine'
      ),
      'Power (kW)': formatTooltip(
        translation?.tractorSpecs?.tooltips?.powerKw,
        'Power output of {brandModel} measured in kilowatts'
      ),
      Cylinders: formatTooltip(
        translation?.tractorSpecs?.tooltips?.cylinders,
        'Number of cylinders in the {brandModel} engine'
      ),
      Displacement: formatTooltip(
        translation?.tractorSpecs?.tooltips?.displacement,
        'Engine displacement of {brandModel} in cubic centimeters (CC)'
      ),
      'Engine Rated RPM': formatTooltip(
        translation?.tractorSpecs?.tooltips?.engineRatedRpm,
        'The optimal RPM at which the {brandModel} engine operates efficiently'
      ),
      'Cooling System': formatTooltip(
        translation?.tractorSpecs?.tooltips?.coolingSystem,
        'Type of cooling system used in {brandModel} to maintain engine temperature'
      ),
      'Specific Fuel Consumption': formatTooltip(
        translation?.tractorSpecs?.tooltips?.specificFuelConsumption,
        'Amount of fuel consumed per unit of power output by {brandModel}'
      ),
      Torque: formatTooltip(
        translation?.tractorSpecs?.tooltips?.torque,
        'Rotational force produced by the {brandModel} engine'
      ),

      // Transmission specifications
      'Transmission Name': formatTooltip(
        translation?.tractorSpecs?.tooltips?.transmissionName,
        'Type and model of the transmission system in {brandModel}'
      ),
      'Number of Gears': formatTooltip(
        translation?.tractorSpecs?.tooltips?.numberOfGears,
        'Total number of forward and reverse gears available in {brandModel}'
      ),
      'Maximum Forward Speed': formatTooltip(
        translation?.tractorSpecs?.tooltips?.maximumForwardSpeed,
        'Maximum speed the {brandModel} can achieve in forward direction'
      ),
      'Maximum Reverse Speed': formatTooltip(
        translation?.tractorSpecs?.tooltips?.maximumReverseSpeed,
        'Maximum speed the {brandModel} can achieve in reverse direction'
      ),
      'Clutch Size': formatTooltip(
        translation?.tractorSpecs?.tooltips?.clutchSize,
        'Size of the clutch mechanism in {brandModel}'
      ),
      'Clutch Type': formatTooltip(
        translation?.tractorSpecs?.tooltips?.clutchType,
        'Type of clutch system used in {brandModel}'
      ),

      // PTO specifications
      'PTO HP': formatTooltip(
        translation?.tractorSpecs?.tooltips?.ptoHp,
        'Power Take-Off horsepower available for implements in {brandModel}'
      ),
      'PTO Type': formatTooltip(
        translation?.tractorSpecs?.tooltips?.ptoType,
        'Type of Power Take-Off system in {brandModel}'
      ),
      'PTO Speed': formatTooltip(
        translation?.tractorSpecs?.tooltips?.ptoSpeed,
        'Operating speed of the Power Take-Off in {brandModel}'
      ),

      // Brakes
      Brakes: formatTooltip(
        translation?.tractorSpecs?.tooltips?.brakes,
        'Type of braking system used in {brandModel}'
      ),

      // Steering specifications
      Steering: formatTooltip(
        translation?.tractorSpecs?.tooltips?.steering,
        'Type of steering system used in {brandModel}'
      ),
      'Steering Adjustment': formatTooltip(
        translation?.tractorSpecs?.tooltips?.steeringAdjustment,
        'Adjustability features of the steering system in {brandModel}'
      ),
      'Turning Radius': formatTooltip(
        translation?.tractorSpecs?.tooltips?.turningRadius,
        'Minimum radius required for {brandModel} to make a complete turn'
      ),

      // Fuel Tank specifications
      'Fuel Tank Capacity': formatTooltip(
        translation?.tractorSpecs?.tooltips?.fuelTankCapacity,
        'Maximum fuel storage capacity of {brandModel} tank'
      ),
      'Pump Flow': formatTooltip(
        translation?.tractorSpecs?.tooltips?.pumpFlow,
        'Flow rate of the hydraulic pump in {brandModel}'
      ),

      // Dimension & Weight specifications
      Length: formatTooltip(
        translation?.tractorSpecs?.tooltips?.length,
        'Overall length of {brandModel}'
      ),
      Height: formatTooltip(
        translation?.tractorSpecs?.tooltips?.height,
        'Overall height of {brandModel}'
      ),
      Width: formatTooltip(
        translation?.tractorSpecs?.tooltips?.width,
        'Overall width of {brandModel}'
      ),
      'Wheel Base': formatTooltip(
        translation?.tractorSpecs?.tooltips?.wheelBase,
        'Distance between the front and rear axles of {brandModel}'
      ),
      'Tractor Weight': formatTooltip(
        translation?.tractorSpecs?.tooltips?.tractorWeight,
        'Total weight of {brandModel} without implements'
      ),
      'Ground Clearance': formatTooltip(
        translation?.tractorSpecs?.tooltips?.groundClearance,
        'Minimum distance between the ground and the lowest part of {brandModel}'
      ),

      // Hydraulic specifications
      'Lifting Capacity': formatTooltip(
        translation?.tractorSpecs?.tooltips?.liftingCapacity,
        'Maximum weight the hydraulic system of {brandModel} can lift'
      ),
      'Point Linkage': formatTooltip(
        translation?.tractorSpecs?.tooltips?.pointLinkage,
        'Type of linkage system for implements in {brandModel}'
      ),
      'Hydraulic Control': formatTooltip(
        translation?.tractorSpecs?.tooltips?.hydraulicControl,
        'Type of hydraulic control system in {brandModel}'
      ),

      // Wheels & Tyres specifications
      'Tyre Size': formatTooltip(
        translation?.tractorSpecs?.tooltips?.tyreSize,
        'Size specifications of the tyres used in {brandModel}'
      ),
      'Wheel Drive': formatTooltip(
        translation?.tractorSpecs?.tooltips?.wheelDrive,
        'Type of wheel drive system (2WD or 4WD) in {brandModel}'
      ),

      // Other specifications
      Brand: formatTooltip(
        translation?.tractorSpecs?.tooltips?.brand,
        'Manufacturer brand - {brand}'
      ),
      Model: formatTooltip(
        translation?.tractorSpecs?.tooltips?.model,
        'Specific model name - {model}'
      ),
      'Price Range': formatTooltip(
        translation?.tractorSpecs?.tooltips?.priceRange,
        'Expected price range of {brandModel}'
      ),
      Warranty: formatTooltip(
        translation?.tractorSpecs?.tooltips?.warranty,
        'Warranty period and coverage details for {brandModel}'
      ),
      Application: formatTooltip(
        translation?.tractorSpecs?.tooltips?.application,
        'Recommended applications and uses for {brandModel}'
      ),
      RPM: formatTooltip(
        translation?.tractorSpecs?.tooltips?.rpm,
        'Revolutions per minute of the {brandModel} engine'
      ),
      Accessories: formatTooltip(
        translation?.tractorSpecs?.tooltips?.accessories,
        'Additional accessories available with {brandModel}'
      ),
      'Air Filter': formatTooltip(
        translation?.tractorSpecs?.tooltips?.airFilter,
        'Type of air filtration system in {brandModel}'
      ),
      Axcel: formatTooltip(
        translation?.tractorSpecs?.tooltips?.axcel,
        'Axcel specification details for {brandModel}'
      ),
      'AC Type': formatTooltip(
        translation?.tractorSpecs?.tooltips?.acType,
        'Type of air conditioning system in {brandModel}'
      ),
      Series: formatTooltip(
        translation?.tractorSpecs?.tooltips?.series,
        'Tractor series classification of {brandModel}'
      ),
      Battery: formatTooltip(
        translation?.tractorSpecs?.tooltips?.battery,
        'Battery specifications and capacity of {brandModel}'
      ),
      Alternator: formatTooltip(
        translation?.tractorSpecs?.tooltips?.alternator,
        'Alternator specifications for charging system in {brandModel}'
      ),
      'Differential Lock': formatTooltip(
        translation?.tractorSpecs?.tooltips?.differentialLock,
        'Differential lock system for improved traction in {brandModel}'
      ),
    };

    return tooltips[label] || formatTooltip(null, `Information about ${label} for {brandModel}`);
  };

  const toggleSection = section => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Specification sections with their respective data
  const specificationSections = [
    {
      key: 'engine',
      title: translation?.tractorDetails?.specCategories?.engine || 'Engine',
      specs: [
        {
          label: translation?.tractorSpecs?.engine || 'Engine Name',
          value: tractorDetail.engine_name,
        },
        { label: translation?.tractorSpecs?.hp || 'HP', value: tractorDetail.hp },
        {
          label: translation?.tractorSpecs?.powerKw || 'Power (kW)',
          value: tractorDetail.power_kw,
        },
        {
          label: translation?.tractorSpecs?.cylinders || 'Cylinders',
          value: tractorDetail.cylinder,
        },
        {
          label: translation?.tractorSpecs?.displacement || 'Displacement',
          value: tractorDetail.displacement_cc,
        },
        {
          label: translation?.tractorSpecs?.engineRatedRpm || 'Engine Rated RPM',
          value: tractorDetail.engine_rated_rpm,
        },
        {
          label: translation?.tractorSpecs?.coolingSystem || 'Cooling System',
          value: tractorDetail.cooling_system,
        },
        {
          label: translation?.tractorSpecs?.specificFuelConsumption || 'Specific Fuel Consumption',
          value: tractorDetail.specific_fuel_consumption,
        },
        { label: translation?.tractorSpecs?.torque || 'Torque', value: tractorDetail.torque },
      ],
    },
    {
      key: 'transmission',
      title: translation?.tractorDetails?.specCategories?.transmission || 'Transmission',
      specs: [
        {
          label: translation?.tractorSpecs?.transmissionName || 'Transmission Name',
          value: tractorDetail.transmission_name,
        },
        {
          label: translation?.tractorSpecs?.numberOfGears || 'Number of Gears',
          value: tractorDetail.number_of_gears,
        },
        {
          label: translation?.tractorSpecs?.maximumForwardSpeed || 'Maximum Forward Speed',
          value: tractorDetail.maximum_forward_speed,
        },
        {
          label: translation?.tractorSpecs?.maximumReverseSpeed || 'Maximum Reverse Speed',
          value: tractorDetail.maximum_reverse_speed,
        },
        {
          label: translation?.tractorSpecs?.clutchSize || 'Clutch Size',
          value: tractorDetail.clutch_size,
        },
        {
          label: translation?.tractorSpecs?.clutchType || 'Clutch Type',
          value: tractorDetail.clutch_type,
        },
      ],
    },
    {
      key: 'pto',
      title: translation?.tractorDetails?.specCategories?.powerTakeOff || 'PTO',
      specs: [
        { label: translation?.tractorSpecs?.ptoHp || 'PTO HP', value: tractorDetail.pto_hp },
        { label: translation?.tractorSpecs?.ptoType || 'PTO Type', value: tractorDetail.pto_type },
        {
          label: translation?.tractorSpecs?.ptoSpeed || 'PTO Speed',
          value: tractorDetail.pto_speed,
        },
      ],
    },
    {
      key: 'brakes',
      title: translation?.tractorDetails?.specCategories?.brakes || 'Brakes',
      specs: [
        { label: translation?.tractorSpecs?.brakes || 'Brakes', value: tractorDetail.brakes },
      ],
    },
    {
      key: 'steering',
      title: translation?.tractorDetails?.specCategories?.steering || 'Steering',
      specs: [
        { label: translation?.tractorSpecs?.steering || 'Steering', value: tractorDetail.steering },
        {
          label: translation?.tractorSpecs?.steeringAdjustment || 'Steering Adjustment',
          value: tractorDetail.steering_adjustment,
        },
        {
          label: translation?.tractorSpecs?.turningRadius || 'Turning Radius',
          value: tractorDetail.turning_radius,
        },
      ],
    },
    {
      key: 'fuelTank',
      title: translation?.tractorSpecs?.fuelTank || 'Fuel Tank',
      specs: [
        {
          label: translation?.tractorSpecs?.fuelTankCapacity || 'Fuel Tank Capacity',
          value: tractorDetail.fuel_tank_capacity,
        },
        {
          label: translation?.tractorSpecs?.pumpFlow || 'Pump Flow',
          value: tractorDetail.pump_flow,
        },
      ],
    },
    {
      key: 'dimension',
      title: translation?.tractorSpecs?.dimensionWeight || 'Dimension & Weight of Tractor',
      specs: [
        { label: translation?.tractorSpecs?.length || 'Length', value: tractorDetail.length },
        { label: translation?.tractorSpecs?.height || 'Height', value: tractorDetail.height },
        { label: translation?.tractorSpecs?.width || 'Width', value: tractorDetail.width },
        {
          label: translation?.tractorSpecs?.wheelBase || 'Wheel Base',
          value: tractorDetail.wheel_base,
        },
        {
          label: translation?.tractorSpecs?.tractorWeight || 'Tractor Weight',
          value: tractorDetail.tractor_weight,
        },
        {
          label: translation?.tractorSpecs?.groundClearance || 'Ground Clearance',
          value: tractorDetail.ground_clearance,
        },
      ],
    },
    {
      key: 'hydraulic',
      title: translation?.tractorDetails?.specCategories?.hydraulics || 'Hydraulic',
      specs: [
        {
          label: translation?.tractorSpecs?.liftingCapacity || 'Lifting Capacity',
          value: tractorDetail.lifting_capacity,
        },
        {
          label: translation?.tractorSpecs?.pointLinkage || 'Point Linkage',
          value: tractorDetail.point_linkage,
        },
        {
          label: translation?.tractorSpecs?.hydraulicControl || 'Hydraulic Control',
          value: tractorDetail.hydrolic_control,
        },
      ],
    },
    {
      key: 'wheels',
      title: translation?.tractorSpecs?.wheelsTyres || 'Wheels & Tyres',
      specs: [
        {
          label: translation?.tractorSpecs?.tyreSize || 'Tyre Size',
          value: tractorDetail.tyre_size,
        },
        {
          label: translation?.tractorSpecs?.wheelDrive || 'Wheel Drive',
          value: tractorDetail.wheel_drive,
        },
      ],
    },
    {
      key: 'others',
      title: translation?.tractorSpecs?.others || 'OTHERS',
      specs: [
        {
          label: translation?.common?.brand || 'Brand',
          value: tractorDetail.brand,
          isLink: true,
          link: `${currentLang == 'hi' ? '/hi' : ''}/tractor/${((tractorDetail.brand_name_en).replaceAll(' ', '-')).toLowerCase()}`
        },
        { label: translation?.common?.model || 'Model', value: tractorDetail.model },
        {
          label: translation?.tractorSpecs?.priceRange || 'Price Range',
          value: tractorDetail.price_range ? `₹ ${tractorDetail.price_range}` : 'NA',
        },

        {
          label: translation?.tractorDetails?.specCategories?.warranty || 'Warranty',
          value: tractorDetail.warrenty,
        },
        {
          label: translation?.tractorSpecs?.application || 'Application',
          value: tractorDetail.application,
        },
        { label: translation?.tractorSpecs?.rpm || 'RPM', value: tractorDetail.rpm },
        {
          label: translation?.tractorSpecs?.accessories || 'Accessories',
          value: tractorDetail.accessories,
        },
        {
          label: translation?.tractorSpecs?.airFilter || 'Air Filter',
          value: tractorDetail.air_filter,
        },
        { label: translation?.tractorSpecs?.axcel || 'Axcel', value: tractorDetail.axcel },
        { label: translation?.tractorSpecs?.acType || 'AC Type', value: tractorDetail.ac_type },
        { label: translation?.tractorSpecs?.series || 'Series', value: tractorDetail.series },
        { label: translation?.tractorSpecs?.battery || 'Battery', value: tractorDetail.battery },
        {
          label: translation?.tractorSpecs?.alternator || 'Alternator',
          value: tractorDetail.alternator,
        },
        {
          label: translation?.tractorSpecs?.differentialLock || 'Differential Lock',
          value: tractorDetail.differential_lock,
        },
        {
          label: 'EMI Calculator',
          value: 'Calculate Tractor EMI',
          isLink: true,
          link: `${currentLang == 'hi' ? '/hi' : ''}/tractor-emi-calculator`,
        },
        {
          label: 'Price',
          value: 'Get Tractor Price',
          isLink: true,
          link: `${currentLang == 'hi' ? '/hi' : ''}/${((tractorDetail.brand_name_en).replaceAll(' ', '-')).toLowerCase()}-${((tractorDetail.model_name_en).replaceAll(' ', '-')).toLowerCase()}/tractor-on-road-price/${tractorDetail.id}`,
        },
      ],
    },
  ];

  const renderSpecificationCard = section => {
    const isOpen = openSections[section.key];
    const filteredSpecs = section.specs.filter(
      spec =>
        spec.value &&
        spec.value !== 'NA' &&
        spec.value !== 'null' &&
        spec.value !== 'undefined' &&
        String(spec.value).trim() !== ''
    );

    if (filteredSpecs.length === 0) return null;

    return (
      <div key={section.key} className="mb-4">
        <div
          className={`${!isOpen && 'rounded-b-lg'
            } flex cursor-pointer items-center justify-between gap-3 rounded-t-lg bg-primary p-4 text-base font-semibold leading-[18px] text-white shadow-main`}
          onClick={() => toggleSection(section.key)}
        >
          <h3>{`${section.title} - ${tractorDetail.brand} ${tractorDetail.model}`}</h3>
          <button>
            <Image
              src={`${isOpen
                ? 'https://images.tractorgyan.com/uploads/114119/66a8b1e63149d-upArrowFeature.png'
                : 'https://images.tractorgyan.com/uploads/114118/66a8b19bd6d66-featureTableDown.png'
                }`}
              height={20}
              width={20}
              alt="toggle-button-image"
              title="toggle-button-image"
              className="h-5 w-full min-w-5 max-w-5"
            />
          </button>
        </div>
        {isOpen && (
          <ul className="rounded-b-lg bg-white p-2 shadow-main">
            {filteredSpecs.map((spec, index) => (
              <li
                key={index}
                className={`flex gap-10 px-2 py-[13px] ${index !== filteredSpecs.length - 1 ? 'border-b-[1px] border-gray-light' : ''
                  }`}
              >
                <div className="flex w-1/2 items-center justify-between">
                  <span className="text-xs font-normal text-gray-dark">{spec.label}</span>
                  <div className="">
                    <Tooltip content={getTooltipContent(spec.label)}>
                      <Image
                        src="https://images.tractorgyan.com/uploads/114120/66a8b8690664c-informationTableIcon.png"
                        height={15}
                        width={15}
                        alt="information-icon"
                        title="information-icon"
                        className="h-[15px] w-full min-w-[15px] max-w-[15px]"
                      />
                    </Tooltip>
                  </div>
                </div>
                <div className="w-1/2">
                  {spec.isLink ? (
                    <Link
                      href={spec.link}
                      className="text-sm font-medium text-primary hover:text-primary-dark underline"
                    >
                      {spec.value}
                    </Link>
                  ) : (
                    <span
                      className={`text-sm font-medium text-black ${spec.label === (translation?.tractorSpecs?.tyreSize || 'Tyre Size') ? 'break-words' : ''}`}
                    >
                      {spec.value}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="relative mt-4 h-full w-full">
        <div className="sticky bottom-0 top-0">
          <div className="mb-6 block md:hidden">
            <h2 className="border-b-3 inline-block border-secondary pb-2 text-lg font-semibold leading-6">
              {`${tractorDetail.brand} ${tractorDetail.model} ${translation?.tractorDetails?.sections?.technicalSpecifications || 'Technical Specifications'}`}
            </h2>
            <p className="text-sm">
              {translation?.tractorSpecs?.detailedDescription ||
                'Detailed technical specifications and features of the'}{' '}
              {tractorDetail.brand} {tractorDetail.model}{' '}
              {translation?.common?.tractor || 'tractor'}.
            </p>
          </div>

          {/* Main heading outside of cards */}
          <div className="mb-6 hidden md:block">
            <h2 className="border-b-3 inline-block border-secondary pb-2 text-lg font-semibold leading-6">
              {`${tractorDetail.brand} ${tractorDetail.model} ${translation?.tractorDetails?.sections?.technicalSpecifications || 'Technical Specifications'}`}
            </h2>
          </div>

          {/* Render all specification cards */}
          {specificationSections.map(section => renderSpecificationCard(section))}
        </div>
      </div>
    </>
  );
};

export default TractorDetailsSpecs;
