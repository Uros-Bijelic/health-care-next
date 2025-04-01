type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const patientId = (await params).id;
  console.log('patientId', patientId);

  return <div>Specific Patient Page</div>;
};

export default Page;
