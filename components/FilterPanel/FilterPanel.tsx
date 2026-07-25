'use client';

import { useState, type SubmitEventHandler } from 'react';
import { ClearIcon, LocationIcon } from '@/components/icons';
import { ENGINE_LABELS, FORM_LABELS, TRANSMISSION_LABELS } from '@/lib/camperDisplay';
import type { CamperEngine, CamperFilters, CamperForm, CamperTransmission } from '@/types/camper';
import styles from './FilterPanel.module.css';

const FORM_OPTIONS: CamperForm[] = ['alcove', 'panel_van', 'integrated', 'semi_integrated'];
const ENGINE_OPTIONS: CamperEngine[] = ['diesel', 'petrol', 'hybrid', 'electric'];
const TRANSMISSION_OPTIONS: CamperTransmission[] = ['automatic', 'manual'];

interface FilterPanelProps {
  onApply: (filters: CamperFilters) => void;
}

interface RadioGroupProps<T extends string> {
  name: string;
  title: string;
  options: T[];
  labels: Record<T, string>;
  value: T | undefined;
  onChange: (value: T) => void;
}

function RadioGroup<T extends string>({
  name,
  title,
  options,
  labels,
  value,
  onChange,
}: RadioGroupProps<T>) {
  return (
    <fieldset className={styles.radioGroup}>
      <legend className={styles.radioLegend}>{title}</legend>
      {options.map((option) => (
        <label key={option} className={styles.radioLabel}>
          <input
            type="radio"
            name={name}
            checked={value === option}
            onChange={() => onChange(option)}
            className={styles.radioInput}
          />
          {labels[option]}
        </label>
      ))}
    </fieldset>
  );
}

export function FilterPanel({ onApply }: FilterPanelProps) {
  const [location, setLocation] = useState('');
  const [form, setForm] = useState<CamperForm>();
  const [engine, setEngine] = useState<CamperEngine>();
  const [transmission, setTransmission] = useState<CamperTransmission>();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onApply({ location: location.trim() || undefined, form, engine, transmission });
  };

  function handleClear() {
    setLocation('');
    setForm(undefined);
    setEngine(undefined);
    setTransmission(undefined);
    onApply({});
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.fieldGroup}>
        <label htmlFor="location" className={styles.fieldLabel}>
          Location
        </label>
        <div className={styles.inputWrapper}>
          <LocationIcon
            className={`${styles.inputIcon} ${location ? styles.inputIconFilled : ''}`.trim()}
            size={20}
          />
          <input
            id="location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="City"
            className={styles.locationInput}
          />
        </div>
      </div>

      <h2 className={styles.filtersTitle}>Filters</h2>

      <RadioGroup
        name="form"
        title="Camper form"
        options={FORM_OPTIONS}
        labels={FORM_LABELS}
        value={form}
        onChange={setForm}
      />

      <RadioGroup
        name="engine"
        title="Engine"
        options={ENGINE_OPTIONS}
        labels={ENGINE_LABELS}
        value={engine}
        onChange={setEngine}
      />

      <RadioGroup
        name="transmission"
        title="Transmission"
        options={TRANSMISSION_OPTIONS}
        labels={TRANSMISSION_LABELS}
        value={transmission}
        onChange={setTransmission}
      />

      <button type="submit" className={styles.searchButton}>
        Search
      </button>
      <button type="button" onClick={handleClear} className={styles.clearButton}>
        <ClearIcon size={24} />
        Clear filters
      </button>
    </form>
  );
}
