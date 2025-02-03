import { DoctorSearch } from '@/components/network/DoctorSearch';
import { AppointmentScheduler } from '@/components/network/AppointmentScheduler';
import { SpecialistDirectory } from '@/components/network/SpecialistDirectory';

export default function HealthcareNetwork() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center">
        Healthcare Network ❄️
      </h1>
      
      <DoctorSearch />
      <AppointmentScheduler />
      <SpecialistDirectory />
    </div>
  );
}
