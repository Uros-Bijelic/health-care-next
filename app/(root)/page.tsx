import DoctorDashboard from '@/components/features/doctors/doctor-dashboard.';
import UserDashboard from '@/components/features/user/user-dashboard';

import { auth } from '@/auth';

const Home = async () => {
  const session = await auth();

  const isDoctor = session?.user.role === 'doctor';

  return isDoctor ? <DoctorDashboard /> : <UserDashboard />;
};

export default Home;
