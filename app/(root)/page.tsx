import DoctorDashboard from '@/features/doctors/components/doctor-dashboard.';
import UserDashboard from '@/features/users/components/user-dashboard';

import { auth } from '@/auth';

const Home = async () => {
  const session = await auth();

  const isDoctor = session?.user.role === 'doctor';

  return isDoctor ? <DoctorDashboard /> : <UserDashboard />;
};

export default Home;
