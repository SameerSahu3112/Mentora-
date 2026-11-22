export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-surface-container-lowest text-on-surface">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="font-headline-lg text-headline-lg text-secondary font-bold mb-6">Available Courses</h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-8">
          Browse JEE Main January, JEE Main April, and JEE Advanced courses with clear pricing and exam dates.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            { name: 'Rise', price: '₹299', exam: 'JEE Main — January', target: 'Class 11 & 12' },
            { name: 'Spark', price: '₹499', exam: 'JEE Main — April', target: 'Class 12 & Droppers' },
            { name: 'Apex', price: '₹699', exam: 'JEE Advanced', target: 'Top 10k Rank Focus' },
          ].map((course) => (
            <div key={course.name} className="bg-surface-container p-6 rounded-xl border border-outline-variant/20 hover:bg-surface-container-high transition-colors">
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold mb-2">{course.name}</h3>
              <span className="font-body-sm text-body-sm text-secondary mb-2 block">{course.exam}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mb-4 block">{course.target}</span>
              <div className="font-headline-lg text-headline-lg font-bold text-secondary mb-4">{course.price}</div>
              <button className="w-full py-2 rounded bg-secondary text-on-secondary font-label-md text-label-md font-bold hover:bg-secondary-fixed transition-colors">
                View Batches
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
