import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { DraftSelector, DeviceOption, DeviceMap } from '../types';

const SelectorForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<DraftSelector>({
    defaultValues: {
      deviceType: null,
      device: null,
      zone: null,
      nombreVideo: null,
      colorRGB: null,
    },
  });

  const deviceTypes: DeviceOption[] = [
    { value: 'Bookcase', label: 'Bookcase' },
    { value: 'Delta', label: 'Delta' },
    { value: 'Delta_1000', label: 'Delta_1000' },
    { value: 'IndiaBasic', label: 'India Basic' },
    { value: 'IndiaPremium', label: 'India Premium' },
  ];

  const devices: DeviceMap = {
    Bookcase: [
      { value: 'DR_Bookcase_1', label: 'DR Bookcase 1' },
      { value: 'DR_Bookcase_2', label: 'DR Bookcase 2' },
    ],
    Delta: [],
    Delta_1000: [],
    IndiaBasic: [{ value: 'DR_India_Basic_1', label: 'DR India Basic 1' }],
    IndiaPremium: [{ value: 'DR_India_Premium_1', label: 'DR India Premium 1' }],
  };

  const zoneTypes: DeviceOption[] = [
    { value: '1', label: 'Zona 1' },
    { value: '2', label: 'Zona 2' },
    { value: '3', label: 'Zona 3' },
  ];

  const [deviceOptions, setDeviceOptions] = useState<DeviceOption[]>([]);

  const onSubmit = (data: DraftSelector) => {
    console.log('Device:', data.device);
    if (!data.deviceType) {
      alert('Device type is required.');
      return;
    }
  
    if (!data.device) {
      alert('Device is required.');
      return;
    }
  
    if (!data.nombreVideo) {
      alert('No video file selected.');
      return;
    }
  
    console.log('Uploaded Video File:', data.nombreVideo.name); 
    console.log('Device Type: ', data.deviceType.value);
    console.log('Device: ', data.device.value);
    console.log('Zone: ', data.zone?.label);
    console.log('Color: ', data.colorRGB);
  
    const colorRGB = data.colorRGB || ''; 
  
    const formData = new FormData();
    formData.append('videoFile', data.nombreVideo);
    formData.append('deviceType', data.deviceType.value);
    formData.append('device', data.device.value);
    formData.append('zone', data.zone?.value || ''); 
    formData.append('color', colorRGB); 
  
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Server Response:', result);
        alert('Data uploaded successfully!');

        //Reset Form
        reset({
            deviceType: null,
            device: null,
            nombreVideo: null, 
            zone: null,
            colorRGB: null,
        });
      })
      .catch((error) => {
        console.error('Error uploading data:', error);
        alert('Failed to upload data.');
      });
  };  

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Device Selector</h2>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >

        <div className="mb-5">
          <label htmlFor="deviceType" className="text-sm uppercase font-bold">
            Select Device Type
          </label>
          <Controller
            name="deviceType"
            control={control}
            rules={{ required: 'Device Type is required' }}
            render={({ field }) => (
              <Select
                {...field}
                options={deviceTypes}
                placeholder="Choose a device type"
                onChange={(selectedOption) => {
                  field.onChange(selectedOption); // Update form state
                  setDeviceOptions(devices[selectedOption?.value || ''] || []); // Update dynamic options
                  setValue('device', null); // Reset second select
                }}
              />
            )}
          />
          {errors.deviceType && (
            <p className="text-red-500 text-sm mt-2">{errors.deviceType.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="device" className="text-sm uppercase font-bold">
            Select Device
          </label>
          <Controller
            name="device"
            control={control}
            rules={{
              validate: (value) =>
                deviceOptions.length === 0
                  ? 'No devices available for this type'
                  : value !== null || 'Device is required',
            }}
            render={({ field }) => (
              <Select
                {...field}
                options={deviceOptions}
                placeholder={
                  deviceOptions.length > 0
                    ? 'Choose a device'
                    : 'No devices available'
                }
                isDisabled={deviceOptions.length === 0}
              />
            )}
          />
          {errors.device && (
            <p className="text-red-500 text-sm mt-2">{errors.device.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="zone" className="text-sm uppercase font-bold">
            Select Zone
          </label>
          <Controller
            name="zone"
            control={control}
            rules={{ required: 'Zone is required' }}
            render={({ field }) => (
              <Select
                {...field}
                options={zoneTypes}
                placeholder="Choose a zone"
              />
            )}
          />
          {errors.zone && (
            <p className="text-red-500 text-sm mt-2">{errors.zone.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="nombreVideo" className="text-sm uppercase font-bold">
            Choose Media
          </label>
          <Controller
            name="nombreVideo"
            control={control}
            rules={{ required: 'Video is required' }}
            render={({ field }) => (
              <input
                type="file"
                accept="video/*"
                className="border rounded-md w-full p-2 mt-2"
                onChange={(event) => {
                  const file = event.target.files?.[0] || null;
                  field.onChange(file); // Update form state
                }}
              />
            )}
          />
          {errors.nombreVideo && (
            <p className="text-red-500 text-sm mt-2">{errors.nombreVideo.message}</p>
          )}
        </div>

        <div className="mb-5">
            <label htmlFor="colorRGB" className="text-sm uppercase font-bold">
                Choose Color
            </label>
            <Controller
                name="colorRGB"
                control={control}
                rules={{ required: 'Color is required' }}
                render={({ field }) => (
                <div className="flex items-center">
                    <input
                    {...field}
                    type="color"
                    id="colorRGB"
                    className="w-12 h-12 p-0 border-2 border-gray-300 rounded-full cursor-pointer"
                    value={field.value || '#000000'} 
                    onChange={(event) => {
                        field.onChange(event.target.value); 
                    }}
                    />
                </div>
                )}
            />
            {errors.colorRGB && (
                <p className="text-red-500 text-sm mt-2">{errors.colorRGB.message}</p>
            )}
            </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Send to Device"
        />
      </form>
    </div>
  );
};

export default SelectorForm;
