import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Zap, 
  Radio, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Code2
} from 'lucide-react';

interface TechnologyViewProps {
  onRegisterCourse: () => void;
  onNavigate: (tab: any) => void;
}

export const TechnologyView: React.FC<TechnologyViewProps> = ({ onRegisterCourse, onNavigate }) => {
  const [selectedDomain, setSelectedDomain] = useState<number>(0);

  const domains = [
    {
      title: 'VLSI & ASIC Physical Implementation',
      badge: 'RTL to GDSII',
      icon: Cpu,
      description: 'End-to-end digital integrated circuit design flow for modern sub-7nm FinFET and Gate-All-Around (GAA) silicon processes.',
      points: [
        'Multi-Corner Multi-Mode (MCMM) Static Timing Analysis (STA)',
        'Complex Clock Tree Synthesis (CTS) with low-skew buffer insertion',
        'Crosstalk noise avoidance & dynamic IR drop analysis with RedHawk',
        'Physical verification rule decks: Calibre DRC, LVS, Antenna & DFM',
      ],
      tools: ['Cadence Innovus', 'Synopsys PrimeTime', 'Siemens Calibre', 'Design Compiler'],
    },
    {
      title: 'Semiconductor Fabrication & Cleanroom Physics',
      badge: 'Silicon Foundry',
      icon: Activity,
      description: 'Understanding semiconductor material properties, photolithography, ion implantation, chemical mechanical planarization (CMP), and wafer defect metrology.',
      points: [
        'EUV & DUV Photolithography immersion processes',
        'FinFET / GAAFET 3D transistor scaling and leakage mechanics',
        'Process Design Kit (PDK) architecture and SPICE transistor modeling',
        'Automated wafer probing and yield learning curves',
      ],
      tools: ['Synopsys Sentaurus TCAD', 'KLA Metrology', 'PDK Technology Files'],
    },
    {
      title: 'High-Speed Multilayer PCB & Signal Integrity',
      badge: 'Hardware Systems',
      icon: Layers,
      description: 'Designing mission-critical 6 to 16-layer printed circuit boards capable of sustaining multi-gigabit DDR4/5, PCIe Gen4/5, and high-frequency RF transmission lines.',
      points: [
        'Microstrip & stripline controlled impedance routing',
        'S-parameter extraction and eye-diagram jitter analysis',
        'Power Delivery Network (PDN) target impedance & decoupling analysis',
        'DFM / DFA signoff for automated pick-and-place surface mount assembly',
      ],
      tools: ['Altium Designer', 'Siemens HyperLynx SI/PI', 'Polar SI9000', 'KiCad 8'],
    },
    {
      title: 'Power Electronics & Wide Bandgap (SiC / GaN)',
      badge: 'E-Mobility & Energy',
      icon: Zap,
      description: 'Next-generation high-voltage switched-mode converters, bidirectional DC-DC chargers, and EV traction inverters utilizing wide bandgap semiconductors.',
      points: [
        'Silicon Carbide (SiC) & Gallium Nitride (GaN) switching characteristics',
        'High-side isolated gate driver protection and dv/dt mitigation',
        'Field-Oriented Control (FOC) algorithms for high-speed PMSM/BLDC motors',
        'Magnetic core design, planar transformers, and thermal modeling',
      ],
      tools: ['PLECS', 'MATLAB / Simulink', 'LTspice', 'Tektronix Power Analyzers'],
    },
    {
      title: 'Embedded Systems, IoT & RTOS Architecture',
      badge: 'Edge Compute',
      icon: Radio,
      description: 'Bare-metal C and real-time operating system firmware for safety-critical automotive, aerospace, and medical IoT platforms.',
      points: [
        'ARM Cortex-M/A register-level programming and bootloader design',
        'FreeRTOS deterministic task scheduling, mutexes, and queues',
        'Automotive communication protocols: CAN-FD, LIN, Ethernet & FlexRay',
        'Secure firmware over-the-air (OTA) updates and crypto accelerators',
      ],
      tools: ['Keil MDK uVision', 'STM32CubeIDE', 'J-Link Debugger', 'Saleae Logic'],
    },
  ];

  const currentDomain = domains[selectedDomain];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* HEADER */}
      <section className="space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#00828A]">
          Core Engineering Disciplines
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] font-display">
          Technology Infrastructure & Silicon Architecture
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Silphor Technologies specializes across five core electronic and semiconductor engineering domains. Explore our architectural stack, simulation methodologies, and tool suites.
        </p>
      </section>

      {/* INTERACTIVE DOMAIN EXPLORER */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left selector menu */}
        <div className="lg:col-span-4 space-y-2">
          {domains.map((dom, idx) => {
            const Icon = dom.icon;
            const isSelected = selectedDomain === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedDomain(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                  isSelected
                    ? 'border-[#00828A] bg-teal-50/40 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#00828A] text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#00828A]">
                    {dom.badge}
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{dom.title}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-8 p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono font-bold text-[#00828A] uppercase">
                Domain Specification // {currentDomain.badge}
              </span>
              <h2 className="text-2xl font-bold text-[#0B2545] font-display mt-1">
                {currentDomain.title}
              </h2>
            </div>
            <button
              onClick={() => onRegisterCourse()}
              className="px-4 py-2 bg-[#00828A] hover:bg-[#007077] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Explore Course</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {currentDomain.description}
          </p>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Core Technical Competencies & Methodologies:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentDomain.points.map((pt, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-[#00828A] shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Software & EDA Tools Utilized in this Discipline:
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentDomain.tools.map((tool, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-slate-100 text-slate-800 rounded-lg text-xs font-mono font-semibold"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EDA WORKFLOW PIPELINE DIAGRAM */}
      <section className="p-8 rounded-3xl bg-[#0B2545] text-white space-y-6 border border-[#00828A]/40">
        <div>
          <span className="text-xs font-mono text-[#38BDF8] uppercase tracking-widest">
            Standard Silicon Pipeline
          </span>
          <h2 className="text-2xl font-bold font-display text-white mt-1">
            Industrial RTL-to-GDSII ASIC Flow at Silphor
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Our training and client design engineering follows the rigorous signoff benchmarks practiced at leading semiconductor foundries.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
          {[
            { step: '01. RTL Arch', tool: 'Verilog / SystemVerilog', desc: 'Synthesizable coding' },
            { step: '02. Simulation', tool: 'QuestaSim / VCS', desc: 'UVM testbench verification' },
            { step: '03. Synthesis', tool: 'Design Compiler', desc: 'Gate-level mapping' },
            { step: '04. Floorplan', tool: 'Cadence Innovus', desc: 'Power mesh & pin planning' },
            { step: '05. CTS & Route', tool: 'Innovus / PrimeTime', desc: 'Clock tree & timing closure' },
            { step: '06. Signoff', tool: 'Siemens Calibre', desc: 'DRC / LVS / Tape-out GDSII' },
          ].map((pipe, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-left">
              <div className="text-[10px] font-mono text-[#00828A] font-bold">{pipe.step}</div>
              <div className="text-xs font-bold text-white mt-1">{pipe.tool}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{pipe.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
