<?php

namespace App\Controller;

use App\Model\Page;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;
use Twig\Error\LoaderError;

class DefaultController extends AbstractController
{
    #[Route('/{path}', name: 'app_default', requirements: ['path' => '[^/].+'])]
    public function index(string $path = 'index'): Response
    {
        $parameters = [
            'path' => '/'.$path,
            'id' => preg_replace('/[^a-z0-9-]+/', '-', $path),
            'menu_pages' => $this->getMenuPages(),
        ];

        if ('sitemap' === $path) {
            $parameters['pages'] = $this->getPages();
        }

        try {
            return $this->render($path.'.html.twig', $parameters);
        } catch (LoaderError) {
            throw new NotFoundHttpException();
        } catch (\Exception $exception) {
            return $this->render('error.html.twig', $parameters + ['exception' => $exception])
              ->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function getPages(): array
    {
        $pages = [
            new Page('Praktiske oplysninger', '/praktiske-oplysninger', menuIndex: 0),
            new Page('Curriculum vitæ', '/curriculum-vitae', menuIndex: 1),
            new Page('Nudansk ordbog, 1 udgave', '/nudansk-ordbog-1-udgave'),
            new Page('Verdens farligste dyr', '/verdens-farligste-dyr'),
            new Page('Sitemap', '/sitemap'),
        ];
        usort($pages, static fn (Page $a, Page $b): int => $a->getTitle() <=> $b->getTitle());

        return $pages;
    }

    private function getMenuPages(): array
    {
        $pages = array_filter($this->getPages(), static fn (Page $page) => null !== $page->getMenuIndex());
        usort($pages, static fn (Page $a, Page $b): int => $a->getMenuIndex() <=> $b->getMenuIndex());

        return $pages;
    }
}
