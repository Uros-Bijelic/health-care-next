type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const visitId = (await params).id;

  console.log('visit');

  return <div>Specific Visit Page {visitId}</div>;
};

export default Page;
