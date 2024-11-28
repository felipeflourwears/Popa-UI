import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

type DeviceOption = {
  value: string;
  label: string;
};

type DeviceMap = Record<string, DeviceOption[]>;

export type DraftSelector = {
  deviceType: DeviceOption | null;
  device: DeviceOption | null;
  nombreVideo: File | null; // Cambiamos el tipo a File
  colorRGB: string | null;
};

const SelectorForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<DraftSelector>({
    defaultValues: {
      deviceType: null,
      device: null,
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

  const [deviceOptions, setDeviceOptions] = useState<DeviceOption[]>([]);

  const onSubmit = (data: DraftSelector) => {
    if (deviceOptions.length === 0) {
      alert('No devices available for the selected type.');
      return;
    }
    if (data.nombreVideo) {
        console.log('Uploaded Video File:', data.nombreVideo.name);
    }
    console.log('Form Data:', data);
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

         {/* Choose Media */}
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
                    value={field.value || '#000000'} // Asignar valor predeterminado
                    onChange={(event) => {
                        field.onChange(event.target.value); // Actualizar el valor en el formulario
                    }}
                    />
                </div>
                )}
            />
            {errors.colorRGB && (
                <p className="text-red-500 text-sm mt-2">{errors.colorRGB.message}</p>
            )}
            </div>


        {/* Submit Button */}
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
