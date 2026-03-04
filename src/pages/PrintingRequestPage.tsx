import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Download, Package, AlertTriangle, Clock, FileText } from 'lucide-react';
import { useColor } from '../context/ColorContext';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Export Your File',
    description: 'Save your 3D model in both formats to ensure compatibility and quality checking.',
    icon: <Download className="w-8 h-8" />,
    details: [
      'Export as .STL file (for printing)',
      'Export as .STEP file (for quality checking)',
      'Check your model for errors before exporting',
      'Ensure all parts are manifold (watertight)',
    ],
  },
  {
    number: '02',
    title: 'Send for Approval',
    description: 'Email both files to your module tutor and the 3D print team for approval.',
    icon: <Mail className="w-8 h-8" />,
    details: [
      'Attach both .STL and .STEP files',
      'Send to your module tutor for academic approval',
      'CC: de.3dprint@northumbria.ac.uk',
      'Include any special requirements (material, colour, etc.)',
    ],
  },
  {
    number: '03',
    title: 'Collect Your Print',
    description: 'Wait for confirmation email, then collect your completed print from the workshop.',
    icon: <Package className="w-8 h-8" />,
    details: [
      'You will receive an email when your print is ready',
      'Collect from ZERO.ONE.TWO workshop',
      'Bring your student ID for collection',
      'Remove support material before leaving',
    ],
  },
];

const materialOptions = [
  { name: 'White PLA', type: 'Standard', available: true },
  { name: 'Red PLA', type: 'Standard', available: true },
  { name: 'Black PLA', type: 'Standard', available: true },
  { name: 'White TPU', type: 'Flexible', available: 'On request' },
  { name: 'Black TPU', type: 'Flexible', available: 'On request' },
  { name: 'White ABS', type: 'Engineering', available: 'On request' },
  { name: 'Colour Resin', type: 'Polyjet', available: 'On request' },
  { name: 'Exotic Filaments', type: 'Special', available: 'Ask technician' },
];

const importantNotes = [
  {
    title: 'Standard Material',
    content: 'All models will be printed in White PLA as standard. Other standard options include Red or Black PLA.',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: 'Special Materials',
    content: 'TPU (Black or White) is available on request. Other exotic filaments can be requested but purchase may be necessary — please ask a technician.',
    icon: <AlertTriangle className="w-5 h-5" />,
  },
  {
    title: 'ABS & Resin Prints',
    content: 'White ABS prints and colour resin prints can be requested. You must state this requirement clearly in your approval email to your module tutor.',
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: 'Support Material',
    content: 'You will be required to remove the support material from your print before collection is complete.',
    icon: <Package className="w-5 h-5" />,
  },
  {
    title: 'Lead Time',
    content: 'Submit your request at least two weeks before your desired completion date during busy periods. Rush requests cannot be guaranteed.',
    icon: <Clock className="w-5 h-5" />,
  },
];

export default function PrintingRequestPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const infoRef = useRef<HTMLDivElement>(null);
  const { accentColor } = useColor();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          }
        }
      );

      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        gsap.fromTo(step,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
            }
          }
        );
      });

      gsap.fromTo(infoRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 85%',
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0C] pt-24 pb-16">
      {/* Header */}
      <div ref={headerRef} className="px-6 mb-12">
        <div className="max-w-5xl mx-auto">
          <span 
            className="font-mono text-xs uppercase tracking-[0.12em] mb-4 block"
            style={{ color: accentColor }}
          >
            3D Printing Service
          </span>
          <h1 className="font-display text-[clamp(36px,5vw,72px)] font-bold tracking-[-0.03em] text-[#F6F6F6] mb-4">
            Request a 3D Print
          </h1>
          <p className="text-[clamp(14px,1.2vw,18px)] text-[#A6A6A6] max-w-2xl leading-relaxed">
            Follow these three simple steps to submit your 3D printing request. 
            All prints require tutor approval before processing.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={el => { stepsRef.current[index] = el; }}
                className="bg-[#111] border border-[#222] hover:border-[#444] transition-colors"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Number & Icon */}
                    <div className="flex items-center gap-4 md:flex-col md:items-center md:w-24 flex-shrink-0">
                      <span 
                        className="font-display text-4xl md:text-5xl font-bold"
                        style={{ color: accentColor }}
                      >
                        {step.number}
                      </span>
                      <div 
                        className="w-12 h-12 flex items-center justify-center"
                        style={{ color: accentColor }}
                      >
                        {step.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h2 className="font-display text-2xl font-semibold text-[#F6F6F6] mb-2">
                        {step.title}
                      </h2>
                      <p className="text-[#A6A6A6] mb-4">
                        {step.description}
                      </p>
                      
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span 
                              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                              style={{ backgroundColor: accentColor }}
                            />
                            <span className="text-[#A6A6A6] text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Email CTA */}
      <div className="px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <div 
            className="p-8 text-center border"
            style={{ borderColor: accentColor }}
          >
            <Mail className="w-10 h-10 mx-auto mb-4" style={{ color: accentColor }} />
            <h2 className="font-display text-2xl font-semibold text-[#F6F6F6] mb-2">
              Ready to Submit?
            </h2>
            <p className="text-[#A6A6A6] mb-4">
              Send your .STL and .STEP files to:
            </p>
            <a 
              href="mailto:de.3dprint@northumbria.ac.uk"
              className="inline-block font-mono text-lg hover:opacity-80 transition-opacity"
              style={{ color: accentColor }}
            >
              de.3dprint@northumbria.ac.uk
            </a>
            <p className="text-[#6A6A6A] text-sm mt-4">
              Don't forget to CC your module tutor for approval
            </p>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div ref={infoRef} className="px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-semibold text-[#F6F6F6] mb-8">
            Important Information
          </h2>

          {/* Material Options */}
          <div className="bg-[#111] border border-[#222] p-6 mb-8">
            <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-[#6A6A6A] mb-4">
              Available Materials
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {materialOptions.map((material) => (
                <div 
                  key={material.name}
                  className="p-3 bg-[#1a1a1a]"
                >
                  <span className="text-[#F6F6F6] text-sm block">{material.name}</span>
                  <span className="text-[#6A6A6A] text-xs">{material.type}</span>
                  {material.available !== true && (
                    <span 
                      className="text-xs block mt-1"
                      style={{ color: accentColor }}
                    >
                      {material.available}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {importantNotes.map((note, index) => (
              <div 
                key={index}
                className="bg-[#111] border border-[#222] p-5"
              >
                <div className="flex items-start gap-4">
                  <div style={{ color: accentColor }}>
                    {note.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-semibold text-[#F6F6F6] mb-2">
                      {note.title}
                    </h4>
                    <p className="text-[#A6A6A6] text-sm leading-relaxed">
                      {note.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lead Time Warning */}
          <div 
            className="mt-8 p-6 border-l-4"
            style={{ borderLeftColor: accentColor, backgroundColor: '#1a1a1a' }}
          >
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 flex-shrink-0" style={{ color: accentColor }} />
              <div>
                <h4 className="font-display text-lg font-semibold text-[#F6F6F6] mb-2">
                  Planning Ahead
                </h4>
                <p className="text-[#A6A6A6]">
                  Submit your request <strong className="text-[#F6F6F6]">at least two weeks</strong> before your desired completion date during busy periods. 
                  Rush requests cannot be guaranteed and may be declined during peak times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
