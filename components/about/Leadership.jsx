import Image from "next/image";

export default function Leadership() {
  const leaders = [
    {
      name: "Pastor Dr. Ilori",
      title: "University Chaplain",
      image: "/chaplain.jpg",
    },
    {
      name: "Pastor Jerry",
      title: "Pastoral Assistant",
      image: "/pastorjerry.jpg",
    },
    {
      name: "Pastor Dr Okoro",
      title: "Pastoral Assistant",
      image: "/drokoro.jpg",
    },
  ];

  return (
    <section className="py-20 bg-blue-50 px-6 md:px-16">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700">
          Leadership
        </h2>
        <p className="text-gray-600 mt-3">
          A dedicated team of staff, volunteer leaders, and student representatives.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {leaders.map((leader, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow hover:shadow-xl transition p-6 text-center"
          >
            <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
              <Image
                src={leader.image}
                width={300}
                height={300}
                alt={leader.name}
                className="object-cover h-full"
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-900">
              {leader.name}
            </h3>
            <p className="text-blue-700 font-medium">{leader.title}</p>
          </div>
        ))}

      </div>
    </section>
  );
}
