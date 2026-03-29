// src/app/app.component.ts
import { Component }       from '@angular/core';
import { CommonModule }    from '@angular/common';
import { RouterOutlet }    from '@angular/router';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    @if (langService.loading()) {
      <div class="loading-screen">
        <style>
          .loading-screen {
            position: fixed; inset: 0;
            background: #080d14;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            gap: 32px; z-index: 9999; overflow: hidden;
          }
          @keyframes gridMove {
            from { transform: translateY(0); }
            to   { transform: translateY(48px); }
          }
          @keyframes pulseGlow {
            0%,100% { opacity: 0.4; transform: scale(1); }
            50%     { opacity: 0.7; transform: scale(1.05); }
          }
          @keyframes barFill {
            from { width: 0%; }
            to   { width: var(--bar-target); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes spinRing { to { transform: rotate(360deg); } }
          @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
          @keyframes float {
            0%,100% { transform: translateY(0px); }
            50%     { transform: translateY(-6px); }
          }
          @keyframes scanline {
            from { top: -4px; }
            to   { top: 100%; }
          }
          .ls-grid {
            position: absolute; inset: -48px;
            background-image:
              linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px);
            background-size: 48px 48px;
            animation: gridMove 3s linear infinite;
            mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
            -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%);
          }
          .ls-glow {
            position: absolute; top: 30%; left: 50%;
            transform: translate(-50%, -50%);
            width: 400px; height: 400px;
            background: radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%);
            animation: pulseGlow 3s ease-in-out infinite;
            pointer-events: none;
          }
          .ls-scanline {
            position: absolute; left: 0; right: 0; height: 2px;
            background: linear-gradient(90deg, transparent, rgba(14,165,233,0.25), transparent);
            animation: scanline 2.5s linear infinite;
            pointer-events: none;
          }
          .ls-logo-wrap {
            position: relative;
            animation: float 3s ease-in-out infinite;
            text-align: center;
          }
          .ls-ring-outer {
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 90px; height: 90px; border-radius: 50%;
            border: 1px solid rgba(14,165,233,0.12);
            animation: spinRing 8s linear infinite;
          }
          .ls-ring-inner {
            position: absolute; top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 68px; height: 68px; border-radius: 50%;
            border: 1px dashed rgba(14,165,233,0.08);
            animation: spinRing 5s linear infinite reverse;
          }
          .ls-logo-text {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 13px; letter-spacing: -0.02em;
            animation: fadeUp 0.6s ease both;
          }
          .ls-spinner-wrap {
            position: relative; width: 48px; height: 48px;
            animation: fadeUp 0.6s 0.2s ease both; opacity: 0;
          }
          .ls-spinner-track {
            position: absolute; inset: 0; border-radius: 50%;
            border: 2px solid rgba(14,165,233,0.08);
          }
          .ls-spinner-ring {
            position: absolute; inset: 0; border-radius: 50%;
            border: 2px solid transparent;
            border-top-color: #0ea5e9;
            border-right-color: rgba(14,165,233,0.3);
            animation: spinRing 1s linear infinite;
          }
          .ls-spinner-dot {
            position: absolute; top: 0; left: 50%;
            transform: translateX(-50%) translateY(-1px);
            width: 5px; height: 5px; border-radius: 50%;
            background: #0ea5e9;
            box-shadow: 0 0 8px rgba(14,165,233,0.8);
          }
          .ls-bars {
            display: flex; flex-direction: column; gap: 8px; width: 200px;
            animation: fadeUp 0.6s 0.4s ease both; opacity: 0;
          }
          .ls-bar-row {
            display: flex; align-items: center; gap: 10px;
          }
          .ls-bar-label {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 9px; color: #1e2d42;
            width: 80px; text-align: right;
          }
          .ls-bar-track {
            flex: 1; height: 2px;
            background: rgba(14,165,233,0.08); border-radius: 2px; overflow: hidden;
          }
          .ls-bar-fill {
            height: 100%;
            background: linear-gradient(90deg, #0284c7, #38bdf8);
            border-radius: 2px;
            animation: barFill cubic-bezier(0.4,0,0.2,1) both;
          }
          .ls-status {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 10px; color: #334155;
            letter-spacing: 0.08em;
            animation: fadeUp 0.6s 0.6s ease both; opacity: 0;
          }
          .ls-cursor {
            color: #0ea5e9;
            animation: blink 1s step-end infinite;
          }
        </style>

        <!-- Grid -->
        <div style="position:absolute;inset:0;overflow:hidden;pointer-events:none;">
          <div class="ls-grid"></div>
        </div>

        <!-- Glow + scanline -->
        <div class="ls-glow"></div>
        <div class="ls-scanline"></div>

        <!-- Logo flotante -->
        <div class="ls-logo-wrap">
          <div class="ls-ring-outer"></div>
          <div class="ls-ring-inner"></div>
          <div class="ls-logo-text">
            <span style="color:#334155">// </span>
            <span style="color:#0ea5e9;font-weight:600">Kevin Julián Arias Rogeles</span>
            <span style="color:#475569">.portfolio</span>
          </div>
        </div>

        <!-- Spinner -->
        <div class="ls-spinner-wrap">
          <div class="ls-spinner-track"></div>
          <div class="ls-spinner-ring"></div>
          <div class="ls-spinner-dot"></div>
        </div>

        <!-- Barras de progreso -->
        <div class="ls-bars">
          <div class="ls-bar-row">
            <span class="ls-bar-label">translations</span>
            <div class="ls-bar-track">
              <div class="ls-bar-fill"
                   style="--bar-target:100%;animation-duration:1.2s;animation-delay:0.6s;">
              </div>
            </div>
          </div>
          <div class="ls-bar-row">
            <span class="ls-bar-label">projects</span>
            <div class="ls-bar-track">
              <div class="ls-bar-fill"
                   style="--bar-target:75%;animation-duration:1s;animation-delay:0.9s;">
              </div>
            </div>
          </div>
          <div class="ls-bar-row">
            <span class="ls-bar-label">experience</span>
            <div class="ls-bar-track">
              <div class="ls-bar-fill"
                   style="--bar-target:50%;animation-duration:0.8s;animation-delay:1.2s;">
              </div>
            </div>
          </div>
        </div>

        <!-- Status -->
        <div class="ls-status">
          initializing system<span class="ls-cursor">_</span>
        </div>

      </div>

    } @else {
      <router-outlet />
    }
  `,
})
export class AppComponent {
  constructor(public langService: LanguageService) {}
}